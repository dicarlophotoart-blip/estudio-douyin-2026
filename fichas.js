// Base de datos de fichas
const fichas = [
    {
        nombre: "钱冰",
        pinyin: "Qián Bīng",
        seguidores: 4.99,
        likes: 130,
        ratio: 26.07,
        origen: "Chengdu, Sichuan",
        nicho: "Alto impacto",
        archivo: "Giovanna.jpg"
    },
    {
        nombre: "隙晓暮",
        pinyin: "Xì Xiǎo Mù",
        seguidores: 4.80,
        likes: 67.7,
        ratio: 14.10,
        origen: "Sin confirmar",
        nicho: "Pipa + Hanfu",
        archivo: "pipa.jpg"
    },
    {
        nombre: "Mimi蛋儿",
        pinyin: "Mimi Dàn'ér",
        seguidores: 3.81,
        likes: 70,
        ratio: 18.38,
        origen: "Hong Kong",
        nicho: "Jazz dance",
        archivo: "mimi.jpg"
    },
    {
        nombre: "妮老师",
        pinyin: "Nī Lǎoshī",
        seguidores: 3.46,
        likes: 110,
        ratio: 31.84,
        origen: "Fujian",
        nicho: "Humor/Musical 搞怪",
        archivo: "bailarina.jpg"
    },
    {
        nombre: "刘太阳",
        pinyin: "Liú Tàiyáng",
        seguidores: 3.29,
        likes: 19.7,
        ratio: 5.98,
        origen: "Mongolia Interior",
        nicho: "Fitness étnico",
        archivo: "Han Liang.jpg"
    },
    {
        nombre: "飞天小麻花",
        pinyin: "Fēi Tiān Xiǎo Mǎhuā",
        seguidores: 3.18,
        likes: 38.4,
        ratio: 12.09,
        origen: "Beijing",
        nicho: "Wushu competitivo",
        archivo: "wusguiajpg.jpg"
    },
    {
        nombre: "郭喆喆",
        pinyin: "Guō Zhé Zhé",
        seguidores: 3.10,
        likes: 70,
        ratio: 22.60,
        origen: "Chongqing → Wuhan",
        nicho: "Danza Han/Tang",
        archivo: "zhezhe.jpg"
    },
    {
        nombre: "猫姨",
        pinyin: "Māo Yí",
        seguidores: 2.92,
        likes: 74.2,
        ratio: 25.44,
        origen: "Sichuan",
        nicho: "Baile urbano 微胖御姐",
        archivo: "Miaomiao.jpg"
    },
    {
        nombre: "Angier安琦",
        pinyin: "Angier Ān Qí",
        seguidores: 2.80,
        likes: 60,
        ratio: 21.43,
        origen: "Liaoning → Kunming",
        nicho: "Baile urbano + hime-cut",
        archivo: "ngjkkm.jpg"
    },
    {
        nombre: "卢柔伊",
        pinyin: "Lú Róu Yī",
        seguidores: 2.607,
        likes: 49.31,
        ratio: 18.92,
        origen: "Zhejiang",
        nicho: "Guzheng innovador",
        archivo: "guzheng.jpg"
    },
    {
        nombre: "小白狮杨姐",
        pinyin: "Xiǎo Bái Shī Yáng Jiě",
        seguidores: 2.225,
        likes: 22.519,
        ratio: 10.12,
        origen: "Shaanxi",
        nicho: "Danza león blanco",
        archivo: "leon blanco.jpg"
    },
    {
        nombre: "墨尔本获宝",
        pinyin: "Mò'ěrběn Huò Bǎo",
        seguidores: 1.92,
        likes: 5.68,
        ratio: 2.96,
        origen: "Melbourne, Australia",
        nicho: "Contenido lifestyle",
        archivo: "cocinera.jpg"
    },
    {
        nombre: "小七。",
        pinyin: "Xiǎo Qī",
        seguidores: 1.00,
        likes: 5.68,
        ratio: 5.68,
        origen: "Sichuan",
        nicho: "Contenido lifestyle",
        archivo: "xiao qi.jpg"
    },
    {
        nombre: "刘书含",
        pinyin: "Liú Shūhán",
        seguidores: 0.992,
        likes: 16.47,
        ratio: 16.61,
        origen: "Liaoning",
        nicho: "Ópera moderna 戏腔",
        archivo: "Rose.jpg"
    },
    {
        nombre: "秋月凉L",
        pinyin: "Qiū Yuè Liáng",
        seguidores: 0.94,
        likes: 15.26,
        ratio: 16.24,
        origen: "Sichuan",
        nicho: "Hanfu cinematográfico + cosplay",
        archivo: "liang.jpg"
    },
    {
        nombre: "刘荇羽",
        pinyin: "Liú Xíngyǔ",
        seguidores: 0.562,
        likes: 7.2,
        ratio: 12.80,
        origen: "Malasia (Tai Shan)",
        nicho: "Murales en relieve",
        archivo: "muralista.jpg"
    },
    {
        nombre: "潇洒小柴",
        pinyin: "Xiāo Sǎ Xiǎo Chái",
        seguidores: 0.469,
        likes: 6.6,
        ratio: 14.07,
        origen: "Hunan",
        nicho: "Fitness kawaii",
        archivo: "pesakawai.jpg"
    },
    {
        nombre: "小鹤owo",
        pinyin: "Xiǎo Hè owo",
        seguidores: 1.531,
        likes: 20.08,
        ratio: 13.12,
        origen: "Xiamen, Fujian",
        nicho: "Cosplay de alta precisión + análisis de videojuegos",
        archivo: "owo (2).jpg"
    }
];

// ==============================================
// FUNCIONES DE ACTUALIZACIÓN
// ==============================================

function actualizarPagina() {
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    
    document.getElementById('total-fichas').textContent = fichas.length;
    document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    document.getElementById('total-regiones').textContent = regiones.size;
    document.getElementById('footer-fichas').textContent = `${fichas.length} creadoras · 30,500+ comunidad`;
    
    generarTabla(porSeguidores);
    generarGaleria();
}

function generarTabla(lista) {
    const tbody = document.getElementById('tabla-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    lista.forEach(f => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${f.nombre} (${f.pinyin})</td>
            <td>${f.seguidores.toFixed(3)}M</td>
            <td>${f.likes}M</td>
            <td>${f.ratio.toFixed(2)}</td>
            <td>${f.origen}</td>
            <td>${f.nicho}</td>
        `;
        tbody.appendChild(row);
    });
}

function generarGaleria() {
    const galeria = document.getElementById('galeria-cards');
    if (!galeria) return;
    galeria.innerHTML = '';
    fichas.forEach(f => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => abrirModal(f.archivo);
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}`;
        img.className = 'card-img';
        img.alt = f.nombre;
        card.appendChild(img);
        galeria.appendChild(card);
    });
}

// ==============================================
// FUNCIÓN DEL MAPA (CORREGIDA Y SIMPLE)
// ==============================================

function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) {
        console.error('No se encuentra el div chinaMap');
        return;
    }
    
    // Verificar que ECharts esté disponible
    if (typeof echarts === 'undefined') {
        console.error('ECharts no está cargado');
        return;
    }
    
    const mapChart = echarts.init(mapDiv);
    
    const option = {
        title: {
            text: 'Distribución de creadoras en China',
            subtext: 'Provincias con fichas documentadas',
            left: 'center',
            textStyle: { color: '#00ffcc' }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>Creadoras: {c}'
        },
        visualMap: {
            min: 0,
            max: 4,
            left: 'left',
            top: 'bottom',
            calculable: true,
            inRange: {
                color: ['#1a1a1a', '#005f5f', '#00cccc', '#00ffcc', '#80ffcc']
            }
        },
        series: [{
            name: 'Creadoras',
            type: 'map',
            map: 'china',
            roam: true,
            zoom: 1.2,
            scaleLimit: { min: 1, max: 3 },
            label: {
                show: true,
                color: '#fff',
                fontSize: 10
            },
            itemStyle: {
                normal: {
                    areaColor: '#1a1a1a',
                    borderColor: '#333'
                },
                emphasis: {
                    areaColor: '#2a2a2a',
                    borderColor: '#00ffcc'
                }
            },
            data: [
                {name: '四川省', value: 4},
                {name: '辽宁省', value: 2},
                {name: '北京市', value: 1},
                {name: '浙江省', value: 1},
                {name: '陕西省', value: 1},
                {name: '福建省', value: 1},
                {name: '湖南省', value: 1},
                {name: '内蒙古自治区', value: 1},
                {name: '香港特别行政区', value: 1},
                {name: '重庆市', value: 1}
            ]
        }]
    };
    
    mapChart.setOption(option);
    
    window.addEventListener('resize', () => {
        mapChart.resize();
    });
    
    console.log('Mapa generado correctamente');
}

// Inicializar todo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarPagina();
    console.log('Página inicializada');
});
