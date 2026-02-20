// ==============================================
// BASE DE DATOS - SOLO AÑADE AQUÍ TUS FICHAS
// ==============================================

const fichas = [
    // === FICHAS EXISTENTES ===
    { nombre: "钱冰", pinyin: "Qián Bīng", seguidores: 4.99, likes: 130, ratio: 26.07, origen: "Chengdu, Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "Giovanna.jpg" },
    { nombre: "隙晓暮", pinyin: "Xì Xiǎo Mù", seguidores: 4.80, likes: 67.7, ratio: 14.10, origen: "Sin confirmar", provincia: "", coord: null, archivo: "pipa.jpg" },
    { nombre: "Mimi蛋儿", pinyin: "Mimi Dàn'ér", seguidores: 3.81, likes: 70, ratio: 18.38, origen: "Hong Kong", provincia: "香港特别行政区", coord: [114.17, 22.27], archivo: "mimi.jpg" },
    { nombre: "妮老师", pinyin: "Nī Lǎoshī", seguidores: 3.46, likes: 110, ratio: 31.84, origen: "Fujian", provincia: "福建省", coord: [119.30, 26.08], archivo: "bailarina.jpg" },
    { nombre: "刘太阳", pinyin: "Liú Tàiyáng", seguidores: 3.29, likes: 19.7, ratio: 5.98, origen: "Mongolia Interior", provincia: "内蒙古自治区", coord: [111.65, 40.82], archivo: "Han Liang.jpg" },
    { nombre: "飞天小麻花", pinyin: "Fēi Tiān Xiǎo Mǎhuā", seguidores: 3.18, likes: 38.4, ratio: 12.09, origen: "Beijing", provincia: "北京市", coord: [116.40, 39.90], archivo: "wusguiajpg.jpg" },
    { nombre: "郭喆喆", pinyin: "Guō Zhé Zhé", seguidores: 3.10, likes: 70, ratio: 22.60, origen: "Chongqing → Wuhan", provincia: "重庆市", coord: [106.55, 29.56], archivo: "zhezhe.jpg" },
    { nombre: "猫姨", pinyin: "Māo Yí", seguidores: 2.92, likes: 74.2, ratio: 25.44, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "Miaomiao.jpg" },
    { nombre: "Angier安琦", pinyin: "Angier Ān Qí", seguidores: 2.80, likes: 60, ratio: 21.43, origen: "Liaoning → Kunming", provincia: "辽宁省", coord: [123.43, 41.80], archivo: "ngjkkm.jpg" },
    { nombre: "卢柔伊", pinyin: "Lú Róu Yī", seguidores: 2.607, likes: 49.31, ratio: 18.92, origen: "Zhejiang", provincia: "浙江省", coord: [120.15, 30.28], archivo: "guzheng.jpg" },
    { nombre: "小白狮杨姐", pinyin: "Xiǎo Bái Shī Yáng Jiě", seguidores: 2.225, likes: 22.519, ratio: 10.12, origen: "Shaanxi", provincia: "陕西省", coord: [108.94, 34.34], archivo: "leon blanco.jpg" },
    { nombre: "墨尔本获宝", pinyin: "Mò'ěrběn Huò Bǎo", seguidores: 1.92, likes: 5.68, ratio: 2.96, origen: "Melbourne, Australia", provincia: "", coord: null, archivo: "cocinera.jpg" },
    { nombre: "小七。", pinyin: "Xiǎo Qī", seguidores: 1.00, likes: 5.68, ratio: 5.68, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "xiao qi.jpg" },
    { nombre: "刘书含", pinyin: "Liú Shūhán", seguidores: 0.992, likes: 16.47, ratio: 16.61, origen: "Liaoning", provincia: "辽宁省", coord: [123.43, 41.80], archivo: "Rose.jpg" },
    { nombre: "秋月凉L", pinyin: "Qiū Yuè Liáng", seguidores: 0.94, likes: 15.26, ratio: 16.24, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "liang.jpg" },
    { nombre: "刘荇羽", pinyin: "Liú Xíngyǔ", seguidores: 0.562, likes: 7.2, ratio: 12.80, origen: "Malasia (Tai Shan)", provincia: "", coord: null, archivo: "muralista.jpg" },
    { nombre: "潇洒小柴", pinyin: "Xiāo Sǎ Xiǎo Chái", seguidores: 0.469, likes: 6.6, ratio: 14.07, origen: "Hunan", provincia: "湖南省", coord: [112.94, 28.23], archivo: "pesakawai.jpg" },
    { nombre: "小鹤owo", pinyin: "Xiǎo Hè owo", seguidores: 1.531, likes: 20.08, ratio: 13.12, origen: "Xiamen, Fujian", provincia: "福建省", coord: [119.30, 26.08], archivo: "owo (2).jpg" }
];

// ==============================================
// GENERADOR AUTOMÁTICO DE DATOS PARA EL MAPA
// ==============================================

function generarDatosMapa() {
    // Contar fichas por provincia
    const conteo = {};
    fichas.forEach(f => {
        if (f.provincia) {
            conteo[f.provincia] = (conteo[f.provincia] || 0) + 1;
        }
    });
    
    // Generar array para el mapa (colores)
    const datosProvincias = Object.entries(conteo).map(([provincia, total]) => ({
        name: provincia,
        value: total
    }));
    
    // Generar puntos con números (una sola ficha por provincia para evitar puntos repetidos)
    const provinciasUnicas = {};
    fichas.forEach(f => {
        if (f.coord && !provinciasUnicas[f.provincia]) {
            provinciasUnicas[f.provincia] = f;
        }
    });
    
    const puntos = Object.values(provinciasUnicas).map(f => ({
        coord: f.coord,
        value: conteo[f.provincia]
    }));
    
    return { datosProvincias, puntos };
}

// ==============================================
// FUNCIONES DE ACTUALIZACIÓN
// ==============================================

function actualizarPagina() {
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    
    // Estadísticas
    document.getElementById('total-fichas').textContent = fichas.length;
    document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    document.getElementById('total-regiones').textContent = regiones.size;
    document.getElementById('footer-fichas').textContent = `${fichas.length} creadoras · 30,500+ comunidad`;
    
    // Tabla
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';
    porSeguidores.forEach(f => {
        tbody.innerHTML += `<tr><td>${f.nombre} (${f.pinyin})</td><td>${f.seguidores.toFixed(3)}M</td><td>${f.likes}M</td><td>${f.ratio.toFixed(2)}</td><td>${f.origen}</td><td>${f.nicho}</td></tr>`;
    });
    
    // Galería
    const galeria = document.getElementById('galeria-cards');
    galeria.innerHTML = '';
    fichas.forEach(f => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            document.getElementById('modal-img').src = `https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}`;
            document.getElementById('modal').style.display = 'block';
        };
        card.innerHTML = `<img src='https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}' class='card-img'>`;
        galeria.appendChild(card);
    });
}

// ==============================================
// MAPA AUTOMÁTICO (NUNCA SE ROMPE)
// ==============================================

function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) return;
    
    const { datosProvincias, puntos } = generarDatosMapa();
    
    const chart = echarts.init(mapDiv);
    chart.setOption({
        title: { text: 'Distribución de creadoras', left: 'center', textStyle: { color: '#00ffcc' } },
        series: [{
            type: 'map', map: 'china', roam: true, zoom: 1.2,
            data: datosProvincias,
            markPoint: {
                symbol: 'circle', symbolSize: 40,
                data: puntos.map(p => ({ coord: p.coord, value: p.value })),
                label: { show: true, formatter: (p) => p.data.value, position: 'inside', color: '#000', fontSize: 14 },
                itemStyle: { color: '#00ffcc', borderColor: '#fff' }
            }
        }]
    });
    window.addEventListener('resize', () => chart.resize());
}

// ==============================================
// INICIALIZACIÓN
// ==============================================

document.addEventListener('DOMContentLoaded', actualizarPagina);
window.abrirModal = (a) => {
    document.getElementById('modal-img').src = `https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(a)}`;
    document.getElementById('modal').style.display = 'block';
};
window.cerrarModal = () => document.getElementById('modal').style.display = 'none';
document.addEventListener('keydown', (e) => e.key === 'Escape' && cerrarModal());
