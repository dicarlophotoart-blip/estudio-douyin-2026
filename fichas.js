// ==============================================
// ESTUDIO ETNO-ECOLÓGICO DE NICHOS EN DOUYIN 2026
// BASE DE DATOS - Auto-carga con coordenadas automáticas
// ==============================================

let fichas = [];
let provinciasCoords = {};
let cardsVisibles = 12;
const cardsPorCarga = 12;

// ==============================================
// CARGAR COORDENADAS DE PROVINCIAS AUTOMÁTICAMENTE
// ==============================================
async function cargarProvinciasCoords() {
    try {
        const response = await fetch('data/provincias_coords.json');
        if (response.ok) {
            provinciasCoords = await response.json();
            console.log('✅ Coordenadas de provincias cargadas');
        }
    } catch (e) {
        console.warn('⚠️ No se pudo cargar provincias_coords.json');
    }
}

// ==============================================
// OBTENER COORDENADAS AUTOMÁTICAMENTE
// ==============================================
function obtenerCoords(provincia, coordManual = null) {
    if (coordManual && Array.isArray(coordManual) && coordManual.length === 2) {
        return coordManual;
    }
    if (provinciasCoords[provincia]) {
        return provinciasCoords[provincia];
    }
    // Coordenadas por defecto (Beijing)
    return [116.40, 39.90];
}

// ==============================================
// CARGAR TODAS LAS FICHAS DESDE JSONS INDIVIDUALES
// ==============================================
async function cargarTodasLasFichas() {
    await cargarProvinciasCoords();
    
    try {
        const archivos = [
            'qian_bing.json',
            'xi_xiaomu.json',
            'mimi.json',
            'ni_laoshi.json',
            'liu_taiyang.json',
            'feitian.json',
            'guo_zhezhe.json',
            'mao_yi.json',
            'angier.json',
            'lu_rouyi.json',
            'xiao_baishi.json',
            'moerben.json',
            'xiao_qi.json',
            'liu_shuhan.json',
            'qiu_yueliang.json',
            'liu_xingyu.json',
            'xiaosai.json',
            'xiao_he_owo.json',
            'yuan_miaomiao.json',
            'lin_ran.json'
        ];
        
        const promesas = archivos.map(async (archivo) => {
            try {
                const response = await fetch(`data/${archivo}`);
                if (response.ok) {
                    const ficha = await response.json();
                    ficha.coord = obtenerCoords(ficha.provincia, ficha.coord);
                    return ficha;
                }
            } catch (e) {
                console.warn(`⚠️ No se pudo cargar ${archivo}`);
            }
            return null;
        });
        
        const resultados = await Promise.all(promesas);
        fichas = resultados.filter(f => f !== null);
        
        console.log(`✅ Cargadas ${fichas.length} creadoras con coordenadas automáticas`);
        inicializarApp();
        
    } catch (error) {
        console.error('❌ Error cargando fichas:', error);
    }
}

// ==============================================
// INICIALIZACIÓN
// ==============================================
function inicializarApp() {
    actualizarPagina();
    if (document.getElementById('chinaMap')) generarMapa();
    if (document.getElementById('barChart')) generarRanking();
}

// ==============================================
// ACTUALIZAR PÁGINA
// ==============================================
function actualizarPagina() {
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    
    if (document.getElementById('total-fichas')) {
        document.getElementById('total-fichas').textContent = fichas.length;
    }
    if (document.getElementById('max-seguidores')) {
        document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    }
    if (document.getElementById('max-ratio')) {
        document.getElementById('max-ratio').textContent = Math.max(...fichas.map(f => f.ratio)).toFixed(2);
    }
    
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    if (document.getElementById('total-regiones')) {
        document.getElementById('total-regiones').textContent = regiones.size;
    }
    if (document.getElementById('footer-fichas')) {
        document.getElementById('footer-fichas').textContent = fichas.length + ' creadoras · 30,500+ comunidad';
    }
    
    const tbody = document.getElementById('tabla-body');
    if (tbody) {
        tbody.innerHTML = '';
        porSeguidores.forEach(f => {
            tbody.innerHTML += `<tr><td>${f.nombre} (${f.pinyin})</td><td>${f.seguidores.toFixed(3)}M</td><td>${f.likes}M</td><td>${f.ratio.toFixed(2)}</td><td>${f.origen}</td><td>${f.nicho}</td></tr>`;
        });
    }
    
    const galeria = document.getElementById('galeria-cards');
    if (galeria) {
        galeria.innerHTML = '';
        fichas.slice(0, cardsVisibles).forEach(f => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => abrirModal(f.archivo);
            card.innerHTML = `<img src='https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}' class='card-img'>`;
            galeria.appendChild(card);
        });
        
        if (cardsVisibles < fichas.length) {
            const btnMas = document.createElement('div');
            btnMas.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 30px 0;';
            btnMas.innerHTML = `<button class="btn" onclick="cargarMasCards()" style="padding: 12px 30px; font-size: 16px;">📷 Ver más creadoras (${fichas.length - cardsVisibles} restantes)</button>`;
            galeria.appendChild(btnMas);
        }
    }
}

function cargarMasCards() {
    cardsVisibles += cardsPorCarga;
    actualizarPagina();
    document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
}

// ==============================================
// GENERAR MAPA - PUNTOS INDIVIDUALES CON AGRUPACIÓN INTELIGENTE
// ==============================================
function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) return;
    
    let chart = echarts.getInstanceByDom(mapDiv);
    if (chart) echarts.dispose(chart);
    chart = echarts.init(mapDiv);
    
    const fichasConCoordenadas = fichas.filter(f => f.coord && Array.isArray(f.coord) && f.coord.length === 2);
    
    const gruposPorCoordenada = {};
    fichasConCoordenadas.forEach(f => {
        const key = `${f.coord[0]},${f.coord[1]}`;
        if (!gruposPorCoordenada[key]) {
            gruposPorCoordenada[key] = {
                coord: f.coord,
                creadoras: [],
                totalSeguidores: 0
            };
        }
        gruposPorCoordenada[key].creadoras.push(f);
        gruposPorCoordenada[key].totalSeguidores += f.seguidores;
    });
    
    const puntosData = Object.values(gruposPorCoordenada).map(grupo => {
        const esMultiple = grupo.creadoras.length > 1;
        return {
            name: esMultiple ? `${grupo.creadoras.length} creadoras` : grupo.creadoras[0].nombre,
            value: [...grupo.coord, grupo.creadoras.length],
            cantidad: grupo.creadoras.length,
            creadoras: grupo.creadoras.map(c => ({
                nombre: c.nombre,
                pinyin: c.pinyin,
                origen: c.origen,
                nicho: c.nicho,
                seguidores: c.seguidores,
                ratio: c.ratio
            })),
            totalSeguidores: grupo.totalSeguidores
        };
    });
    
    const option = {
        backgroundColor: '#1a1a1a',
        title: { 
            text: 'Distribución de ' + fichasConCoordenadas.length + ' creadoras en ' + puntosData.length + ' ubicaciones', 
            subtext: 'Puntos grandes = múltiples creadoras · Tamaño = seguidores totales',
            left: 'center', 
            textStyle: { color: '#00ffcc', fontSize: 16 },
            subtextStyle: { color: '#888', fontSize: 11 }
        },
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                const d = params.data;
                let html = `<b>${d.cantidad} creadora${d.cantidad > 1 ? 's' : ''}</b><br/>📍 Total: ${d.totalSeguidores.toFixed(3)}M seguidores<br/><br/>`;
                d.creadoras.forEach((c, i) => {
                    html += `${i + 1}. <b>${c.nombre}</b> (${c.pinyin})<br/>   📍 ${c.origen}<br/>   🎨 ${c.nicho}<br/>   👥 ${c.seguidores.toFixed(3)}M · 📈 ${c.ratio.toFixed(2)}<br/><br/>`;
                });
                return html.slice(0, -4);
            }
        },
        geo: {
            map: 'china', 
            roam: true, 
            zoom: 1.2,
            label: { show: true, color: '#fff', fontSize: 9 },
            itemStyle: { 
                areaColor: '#1a1a1a', 
                borderColor: '#00ffcc', 
                borderWidth: 1 
            },
            emphasis: { 
                itemStyle: { areaColor: '#2a2a2a', borderColor: '#00ffcc' } 
            }
        },
        series: [
            {
                name: 'Creadoras', 
                type: 'map', 
                map: 'china', 
                geoIndex: 0,
                label: { show: true, color: '#fff', fontSize: 9 },
                itemStyle: { 
                    areaColor: '#1a1a1a', 
                    borderColor: '#00ffcc', 
                    borderWidth: 1 
                },
                emphasis: { itemStyle: { areaColor: '#2a2a2a' } }
            },
            {
                name: 'Puntos', 
                type: 'scatter', 
                coordinateSystem: 'geo', 
                data: puntosData,
                symbol: 'circle', 
                symbolSize: (val) => {
                    const baseSize = val[2] * 10;
                    const followerBoost = Math.sqrt(val[2]) * 5;
                    return Math.max(12, Math.min(60, baseSize + followerBoost));
                },
                label: { 
                    show: true, 
                    formatter: (p) => p.data.cantidad > 1 ? p.data.cantidad : '',
                    position: 'inside',
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                itemStyle: { 
                    color: (params) => params.data.cantidad > 1 ? '#ffaa00' : '#00ffcc', 
                    borderColor: '#fff', 
                    borderWidth: 2, 
                    shadowBlur: 10, 
                    shadowColor: (params) => params.data.cantidad > 1 ? '#ffaa00' : '#00ffcc'
                },
                emphasis: { 
                    itemStyle: { 
                        color: (params) => params.data.cantidad > 1 ? '#ffcc00' : '#00ffff',
                        borderWidth: 4 
                    }
                }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    
    console.log(`🗺️ Mapa: ${fichasConCoordenadas.length} creadoras en ${puntosData.length} ubicaciones únicas`);
}

// ==============================================
// GENERAR RANKING - DOBLE BARRA (Likes + Seguidores)
// ==============================================
function generarRanking() {
    const chartDiv = document.getElementById('barChart');
    if (!chartDiv) return;
    
    let chart = echarts.getInstanceByDom(chartDiv);
    if (chart) echarts.dispose(chart);
    chart = echarts.init(chartDiv);
    
    const top10 = [...fichas].sort((a, b) => b.ratio - a.ratio).slice(0, 10);
    const nombres = top10.map(f => f.nombre + '\n' + f.pinyin);
    const likesData = top10.map(f => f.likes);
    const seguidoresData = top10.map(f => f.seguidores);
    
    const option = {
        backgroundColor: '#1a1a1a',
        title: { 
            text: 'Top 10: Likes vs Seguidores', 
            subtext: 'Cyan = Likes (M) | Naranja = Seguidores (M)',
            left: 'center', 
            textStyle: { color: '#00ffcc', fontSize: 16 },
            subtextStyle: { color: '#888', fontSize: 11 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                const f = top10[params[0].dataIndex];
                return `<b>${f.nombre}</b> (${f.pinyin})<br/>📍 ${f.origen}<br/>❤️ Likes: <b style="color:#00ffcc">${f.likes}M</b><br/>👥 Seguidores: <b style="color:#ffaa00">${f.seguidores.toFixed(2)}M</b><br/>📈 Ratio: <b style="color:#00ffcc">${f.ratio.toFixed(2)}</b>`;
            }
        },
        legend: {
            data: ['Likes (M)', 'Seguidores (M)'],
            textStyle: { color: '#fff' },
            top: 40
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: { 
            type: 'value', 
            name: 'Millones',
            axisLine: { lineStyle: { color: '#00ffcc' } }, 
            axisLabel: { color: '#888' }, 
            splitLine: { lineStyle: { color: '#333', type: 'dashed' } } 
        },
        yAxis: { 
            type: 'category', 
            data: nombres, 
            axisLabel: { color: '#fff', fontSize: 11, margin: 15 } 
        },
        series: [
            {
                name: 'Likes (M)', 
                type: 'bar', 
                data: likesData,
                itemStyle: { 
                    color: '#00ffcc',
                    borderRadius: [0, 3, 3, 0] 
                },
                label: { 
                    show: true, 
                    position: 'right', 
                    color: '#00ffcc', 
                    fontSize: 10,
                    formatter: (p) => p.value + 'M'
                }
            },
            {
                name: 'Seguidores (M)', 
                type: 'bar', 
                data: seguidoresData,
                itemStyle: { 
                    color: '#ffaa00',
                    borderRadius: [0, 3, 3, 0] 
                },
                label: { 
                    show: true, 
                    position: 'right', 
                    color: '#ffaa00', 
                    fontSize: 10,
                    formatter: (p) => p.value.toFixed(2) + 'M'
                }
            }
        ]
    };
    
    chart.setOption(option);
    setTimeout(() => { chart.resize(); }, 100);
}

// ==============================================
// FUNCIONES GLOBALES
// ==============================================
window.abrirModal = function(archivo) {
    const img = document.getElementById('modal-img'), modal = document.getElementById('modal');
    if (img && modal) { 
        img.src = `https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(archivo)}`; 
        modal.style.display = 'block'; 
        document.body.style.overflow = 'hidden'; 
    }
};

window.cerrarModal = function() { 
    const m = document.getElementById('modal'); 
    if (m) { 
        m.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
    } 
};

document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') cerrarModal(); 
});

// ==============================================
// INICIAR APLICACIÓN
// ==============================================
cargarTodasLasFichas();
