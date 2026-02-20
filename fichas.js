// ==============================================
// BASE DE DATOS: 18 CREADORAS DOCUMENTADAS
// ==============================================

const fichas = [
    // ... (aquí van las 18 fichas, que tienes que copiar de tu versión anterior
    //      o de los mensajes donde te las pasé. Por brevedad, no las repito aquí,
    //      pero deben estar. Si no las tienes, dímelo y te las paso de nuevo.)
    // Por ahora, para que el mapa funcione, mantendré un ejemplo mínimo, pero necesitas las 18.
    { nombre: "钱冰", pinyin: "Qián Bīng", seguidores: 4.99, likes: 130, ratio: 26.07, origen: "Chengdu, Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "Giovanna.jpg", nicho: "Alto impacto" },
    { nombre: "飞天小麻花", pinyin: "Fēi Tiān Xiǎo Mǎhuā", seguidores: 3.18, likes: 38.4, ratio: 12.09, origen: "Beijing", provincia: "北京市", coord: [116.40, 39.90], archivo: "wusguiajpg.jpg", nicho: "Wushu competitivo" }
    // ... (agrega aquí el resto de tus 18 fichas)
];

// ==============================================
// FUNCIONES DE ACTUALIZACIÓN (TABLA Y GALERÍA)
// ==============================================

function actualizarPagina() {
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    document.getElementById('total-fichas').textContent = fichas.length;
    document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    document.getElementById('total-regiones').textContent = regiones.size;
    document.getElementById('footer-fichas').textContent = fichas.length + ' creadoras · 30,500+ comunidad';
    
    const tbody = document.getElementById('tabla-body');
    if (tbody) {
        tbody.innerHTML = '';
        porSeguidores.forEach(f => {
            tbody.innerHTML += `<tr>
                <td>${f.nombre} (${f.pinyin})</td>
                <td>${f.seguidores.toFixed(3)}M</td>
                <td>${f.likes}M</td>
                <td>${f.ratio.toFixed(2)}</td>
                <td>${f.origen}</td>
                <td>${f.nicho}</td>
            </tr>`;
        });
    }
    
    const galeria = document.getElementById('galeria-cards');
    if (galeria) {
        galeria.innerHTML = '';
        fichas.forEach(f => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => abrirModal(f.archivo);
            card.innerHTML = `<img src='https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}' class='card-img'>`;
            galeria.appendChild(card);
        });
    }
}

// ==============================================
// FUNCIÓN PARA GENERAR EL MAPA (CON PUNTOS)
// ==============================================

function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) return;
    
    const chart = echarts.init(mapDiv);
    
    // Contar fichas por provincia y generar puntos únicos
    const conteo = {};
    const provinciasUnicas = {};
    fichas.forEach(f => {
        if (f.provincia && f.coord) {
            conteo[f.provincia] = (conteo[f.provincia] || 0) + 1;
            provinciasUnicas[f.provincia] = provinciasUnicas[f.provincia] || f;
        }
    });
    
    const datosProvincias = Object.entries(conteo).map(([prov, val]) => ({ name: prov, value: val }));
    const puntos = Object.entries(provinciasUnicas).map(([prov, f]) => ({
        coord: f.coord,
        value: conteo[prov]
    }));
    
    const option = {
        title: { text: 'Distribución de creadoras en China', left: 'center', textStyle: { color: '#00ffcc' } },
        tooltip: {
            trigger: 'item',
            formatter: (params) => params.seriesName === 'Puntos' ? 'Creadoras: ' + params.data.value[2] : params.name + '<br/>Creadoras: ' + (params.value || 0)
        },
        series: [
            {
                name: 'Provincias', type: 'map', map: 'china', roam: true, zoom: 1.2,
                label: { show: true, color: '#fff', fontSize: 10 },
                itemStyle: {
                    normal: { areaColor: '#1a1a1a', borderColor: '#00ffcc', borderWidth: 1 },
                    emphasis: { areaColor: '#2a2a2a', borderColor: '#ffffff' }
                },
                data: datosProvincias
            },
            {
                name: 'Puntos', type: 'scatter', coordinateSystem: 'geo', symbol: 'circle', symbolSize: 45,
                data: puntos.map(p => ({ value: [p.coord[0], p.coord[1], p.value] })),
                label: { show: true, formatter: (params) => params.data.value[2], position: 'inside', color: '#000', fontSize: 14, fontWeight: 'bold' },
                itemStyle: { color: '#00ffcc', borderColor: '#fff', borderWidth: 2 }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// ==============================================
// FUNCIONES GLOBALES (MODAL)
// ==============================================

window.abrirModal = function(archivo) {
    const img = document.getElementById('modal-img');
    const modal = document.getElementById('modal');
    if (img && modal) {
        img.src = `https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(archivo)}`;
        modal.style.display = 'block';
    }
};

window.cerrarModal = function() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
};

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// ==============================================
// INICIALIZACIÓN
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    actualizarPagina();
    console.log('✅ Página inicializada con ' + fichas.length + ' fichas');
});
