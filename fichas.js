let cardsVisibles = 12;
const cardsPorCarga = 12;

const fichas = [
    { nombre: "钱冰", pinyin: "Qián Bīng", seguidores: 4.99, likes: 130, ratio: 26.07, origen: "Chengdu, Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "Giovanna.jpg", nicho: "Alto impacto" },
    { nombre: "隙晓暮", pinyin: "Xì Xiǎo Mù", seguidores: 4.80, likes: 67.7, ratio: 14.10, origen: "Sin confirmar", provincia: "北京市", coord: [116.40, 39.90], archivo: "pipa.jpg", nicho: "Pipa + Hanfu" },
    { nombre: "Mimi 蛋儿", pinyin: "Mimi Dàn'ér", seguidores: 3.81, likes: 70, ratio: 18.38, origen: "Hong Kong", provincia: "香港特别行政区", coord: [114.17, 22.27], archivo: "mimi.jpg", nicho: "Jazz dance" },
    { nombre: "妮老师", pinyin: "Nī Lǎoshī", seguidores: 3.46, likes: 110, ratio: 31.84, origen: "Fujian", provincia: "福建省", coord: [119.30, 26.08], archivo: "bailarina.jpg", nicho: "Humor/Musical 搞怪" },
    { nombre: "刘太阳", pinyin: "Liú Tàiyáng", seguidores: 3.29, likes: 19.7, ratio: 5.98, origen: "Mongolia Interior", provincia: "内蒙古自治区", coord: [111.65, 40.82], archivo: "Han Liang.jpg", nicho: "Fitness étnico" },
    { nombre: "飞天小麻花", pinyin: "Fēi Tiān Xiǎo Mhuā", seguidores: 3.18, likes: 38.4, ratio: 12.09, origen: "Beijing", provincia: "北京市", coord: [116.40, 39.90], archivo: "wusguiajpg.jpg", nicho: "Wushu competitivo" },
    { nombre: "郭喆喆", pinyin: "Guō Zhé Zhé", seguidores: 3.10, likes: 70, ratio: 22.60, origen: "Chongqing → Wuhan", provincia: "重庆市", coord: [106.55, 29.56], archivo: "zhezhe.jpg", nicho: "Danza Han/Tang" },
    { nombre: "猫姨", pinyin: "Māo Yí", seguidores: 2.92, likes: 74.2, ratio: 25.44, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "Miaomiao.jpg", nicho: "Baile urbano 微胖御姐" },
    { nombre: "Angier 安琦", pinyin: "Angier Ān Qí", seguidores: 2.80, likes: 60, ratio: 21.43, origen: "Liaoning → Kunming", provincia: "辽宁省", coord: [123.43, 41.80], archivo: "ngjkkm.jpg", nicho: "Baile urbano + hime-cut" },
    { nombre: "卢柔伊", pinyin: "Lú Róu Yī", seguidores: 2.607, likes: 49.31, ratio: 18.92, origen: "Zhejiang", provincia: "浙江省", coord: [120.15, 30.28], archivo: "guzheng.jpg", nicho: "Guzheng innovador" },
    { nombre: "小白狮杨姐", pinyin: "Xiǎo Bái Shī Yáng Jiě", seguidores: 2.225, likes: 22.519, ratio: 10.12, origen: "Shaanxi", provincia: "陕西省", coord: [108.94, 34.34], archivo: "leon blanco.jpg", nicho: "Danza león blanco" },
    { nombre: "墨尔本获宝", pinyin: "Mò'ěrběn Huò Bǎo", seguidores: 1.92, likes: 5.68, ratio: 2.96, origen: "Melbourne, Australia", provincia: "上海市", coord: [121.47, 31.23], archivo: "cocinera.jpg", nicho: "Contenido lifestyle" },
    { nombre: "小七。", pinyin: "Xiǎo Qī", seguidores: 1.00, likes: 5.68, ratio: 5.68, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "xiao qi.jpg", nicho: "Contenido lifestyle" },
    { nombre: "刘书含", pinyin: "Liú Shūhán", seguidores: 0.992, likes: 16.47, ratio: 16.61, origen: "Liaoning", provincia: "辽宁省", coord: [123.43, 41.80], archivo: "Rose.jpg", nicho: "Ópera moderna 戏腔" },
    { nombre: "秋月凉 L", pinyin: "Qiū Yuè Liáng", seguidores: 0.94, likes: 15.26, ratio: 16.24, origen: "Sichuan", provincia: "四川省", coord: [104.07, 30.57], archivo: "liang.jpg", nicho: "Hanfu cinematográfico + cosplay" },
    { nombre: "刘荇羽", pinyin: "Liú Xíngyǔ", seguidores: 0.562, likes: 7.2, ratio: 12.80, origen: "Chongqing, China", provincia: "重庆市", coord: [106.55, 29.56], archivo: "muralista.jpg", nicho: "Murales en relieve" },
    { nombre: "潇洒小柴", pinyin: "Xiāo Sǎ Xiǎo Chái", seguidores: 0.469, likes: 6.6, ratio: 14.07, origen: "Hunan", provincia: "湖南省", coord: [112.94, 28.23], archivo: "pesakawai.jpg", nicho: "Fitness kawaii" },
    { nombre: "小鹤 owo", pinyin: "Xiǎo Hè owo", seguidores: 1.531, likes: 20.08, ratio: 13.12, origen: "Xiamen, Fujian", provincia: "福建省", coord: [119.30, 26.08], archivo: "owo (2).jpg", nicho: "Cosplay de alta precisión + análisis de videojuegos" },
    { nombre: "缘妙妙", pinyin: "Yuán Miàomiào", seguidores: 0.003562, likes: 0.032, ratio: 8.98, origen: "Anhui", provincia: "安徽省", coord: [117.28, 31.86], archivo: "miaoma.jpg", nicho: "Pintura budista + patrimonio inmaterial" },
    { nombre: "林苒", pinyin: "Lín Rǎn", seguidores: 0.063, likes: 0.247, ratio: 3.92, origen: "Jiangsu", provincia: "江苏省", coord: [120.00, 32.00], archivo: "linra.jpg", nicho: "Hanfu + danza tradicional + cinematografía" },
    { nombre: "拿铁笛子", pinyin: "Nátiě Dízǐ", seguidores: 1975, likes: 19695, ratio: 9.97, origen: "辽宁省", provincia: "辽宁省", coord: [121.61, 38.91], archivo: "barbiepesas.jpg", nicho: "Fitness • IFBB Pro • AGP 2023 Champion • 金刚芭比" }    
];

function actualizarPagina() {
    if (!fichas || fichas.length === 0) return;
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    if (document.getElementById('total-fichas')) document.getElementById('total-fichas').textContent = fichas.length;
    if (document.getElementById('max-seguidores')) document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    if (document.getElementById('max-ratio')) document.getElementById('max-ratio').textContent = Math.max(...fichas.map(f => f.ratio)).toFixed(2);
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    if (document.getElementById('total-regiones')) document.getElementById('total-regiones').textContent = regiones.size;
    if (document.getElementById('footer-fichas')) document.getElementById('footer-fichas').textContent = fichas.length + ' creadoras · 30,500+ comunidad';
    const tbody = document.getElementById('tabla-body');
    if (tbody) {
        tbody.innerHTML = '';
        porSeguidores.forEach(f => {
            tbody.innerHTML += '<tr><td>' + f.nombre + ' (' + f.pinyin + ')</td><td>' + f.seguidores.toFixed(3) + 'M</td><td>' + f.likes + 'M</td><td>' + f.ratio.toFixed(2) + '</td><td>' + f.origen + '</td><td>' + f.nicho + '</td></tr>';
        });
    }
    const galeria = document.getElementById('galeria-cards');
    if (galeria) {
        galeria.innerHTML = '';
        fichas.slice(0, cardsVisibles).forEach(f => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => abrirModal(f.archivo);
            card.innerHTML = '<img src="https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/' + encodeURIComponent(f.archivo) + '" class="card-img">';
            galeria.appendChild(card);
        });
        if (cardsVisibles < fichas.length) {
            const btnMas = document.createElement('div');
            btnMas.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 30px 0;';
            btnMas.innerHTML = '<button class="btn" onclick="cargarMasCards()" style="padding: 12px 30px; font-size: 16px;">📷 Ver más creadoras (' + (fichas.length - cardsVisibles) + ' restantes)</button>';
            galeria.appendChild(btnMas);
        }
    }
}

function cargarMasCards() {
    cardsVisibles += cardsPorCarga;
    actualizarPagina();
    const galeria = document.getElementById('galeria');
    if (galeria) galeria.scrollIntoView({ behavior: 'smooth' });
}

function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) return;
    let chart = echarts.getInstanceByDom(mapDiv);
    if (chart) echarts.dispose(chart);
    chart = echarts.init(mapDiv);
    const fichasConCoordenadas = fichas.filter(f => f.coord && Array.isArray(f.coord) && f.coord.length === 2);
    const grupos = {};
    fichasConCoordenadas.forEach(f => {
        const key = f.coord[0] + ',' + f.coord[1];
        if (!grupos[key]) grupos[key] = { coord: f.coord, creadoras: [], total: 0 };
        grupos[key].creadoras.push(f);
        grupos[key].total += f.seguidores;
    });
    const puntosData = Object.values(grupos).map(g => ({
        name: g.creadoras.length > 1 ? g.creadoras.length + ' creadoras' : g.creadoras[0].nombre,
        value: [...g.coord, g.creadoras.length],
        cantidad: g.creadoras.length,
        creadoras: g.creadoras.map(c => ({ nombre: c.nombre, pinyin: c.pinyin, origen: c.origen, nicho: c.nicho, seguidores: c.seguidores, ratio: c.ratio })),
        totalSeguidores: g.total
    }));
    const option = {
        backgroundColor: '#1a1a1a',
        title: { text: 'Distribución de ' + fichasConCoordenadas.length + ' creadoras', left: 'center', textStyle: { color: '#00ffcc', fontSize: 16 } },
        tooltip: { trigger: 'item', formatter: (p) => { const d = p.data; if (!d || !d.creadoras) return ''; let h = '<b>' + d.cantidad + ' creadora' + (d.cantidad > 1 ? 's' : '') + '</b><br/>📍 Total: ' + d.totalSeguidores.toFixed(3) + 'M<br/><br/>'; d.creadoras.forEach((c, i) => { h += (i+1) + '. <b>' + c.nombre + '</b> (' + c.pinyin + ')<br/>   📍 ' + c.origen + '<br/>   🎨 ' + c.nicho + '<br/>   👥 ' + c.seguidores.toFixed(3) + 'M · 📈 ' + c.ratio.toFixed(2) + '<br/><br/>'; }); return h.slice(0, -4); } },
        geo: { map: 'china', roam: true, zoom: 1.2, label: { show: true, color: '#fff', fontSize: 9 }, itemStyle: { areaColor: '#1a1a1a', borderColor: '#00ffcc', borderWidth: 1 }, emphasis: { itemStyle: { areaColor: '#2a2a2a' } } },
        series: [{ name: 'Puntos', type: 'scatter', coordinateSystem: 'geo', data: puntosData, symbol: 'circle', symbolSize: v => Math.max(12, Math.min(60, v[2]*10 + Math.sqrt(v[2])*5)), label: { show: true, formatter: p => p.data.cantidad > 1 ? p.data.cantidad : '', position: 'inside', color: '#000', fontSize: 12, fontWeight: 'bold' }, itemStyle: { color: p => p.data.cantidad > 1 ? '#ffaa00' : '#00ffcc', borderColor: '#fff', borderWidth: 2, shadowBlur: 10 }, emphasis: { itemStyle: { color: p => p.data.cantidad > 1 ? '#ffcc00' : '#00ffff', borderWidth: 4 } } }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

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
        title: { text: 'Top 10: Likes vs Seguidores', subtext: 'Cyan = Likes | Naranja = Seguidores', left: 'center', textStyle: { color: '#00ffcc', fontSize: 16 }, subtextStyle: { color: '#888', fontSize: 11 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: p => { const f = top10[p[0].dataIndex]; return '<b>' + f.nombre + '</b> (' + f.pinyin + ')<br/>📍 ' + f.origen + '<br/>❤️ Likes: <b style="color:#00ffcc">' + f.likes + 'M</b><br/>👥 Seguidores: <b style="color:#ffaa00">' + f.seguidores.toFixed(2) + 'M</b><br/>📈 Ratio: <b style="color:#00ffcc">' + f.ratio.toFixed(2) + '</b>'; } },
        legend: { data: ['Likes (M)', 'Seguidores (M)'], textStyle: { color: '#fff' }, top: 40 },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: { type: 'value', name: 'Millones', axisLine: { lineStyle: { color: '#00ffcc' } }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: '#333', type: 'dashed' } } },
        yAxis: { type: 'category', data: nombres, axisLabel: { color: '#fff', fontSize: 11, margin: 15 } },
        series: [
            { name: 'Likes (M)', type: 'bar', data: likesData, itemStyle: { color: '#00ffcc', borderRadius: [0, 3, 3, 0] }, label: { show: true, position: 'right', color: '#00ffcc', fontSize: 10, formatter: p => p.value + 'M' } },
            { name: 'Seguidores (M)', type: 'bar', data: seguidoresData, itemStyle: { color: '#ffaa00', borderRadius: [0, 3, 3, 0] }, label: { show: true, position: 'right', color: '#ffaa00', fontSize: 10, formatter: p => p.value.toFixed(2) + 'M' } }
        ]
    };
    chart.setOption(option);
    setTimeout(() => chart.resize(), 100);
}

window.abrirModal = function(archivo) {
    const img = document.getElementById('modal-img'), modal = document.getElementById('modal');
    if (img && modal) { img.src = 'https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/' + encodeURIComponent(archivo); modal.style.display = 'block'; document.body.style.overflow = 'hidden'; }
};
window.cerrarModal = function() { const m = document.getElementById('modal'); if (m) { m.style.display = 'none'; document.body.style.overflow = 'auto'; } };
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });
document.addEventListener('DOMContentLoaded', () => { console.log('✅ Iniciando con', fichas.length, 'creadoras'); actualizarPagina(); setTimeout(() => { if (document.getElementById('chinaMap')) generarMapa(); if (document.getElementById('barChart')) generarRanking(); }, 500); });
