// Base de datos de fichas - Solo añade nuevas aquí
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
    }
];

// ==============================================
// FUNCIONES DE ACTUALIZACIÓN DE LA PÁGINA
// ==============================================

function actualizarPagina() {
    // Ordenar por seguidores para los rankings
    const porSeguidores = [...fichas].sort((a, b) => b.seguidores - a.seguidores);
    const porRatio = [...fichas].sort((a, b) => b.ratio - a.ratio);
    
    // Actualizar estadísticas
    document.getElementById('total-fichas').textContent = fichas.length;
    document.getElementById('max-seguidores').textContent = porSeguidores[0].seguidores.toFixed(2) + 'M';
    document.getElementById('max-ratio').textContent = porRatio[0].ratio.toFixed(2);
    
    // Calcular regiones únicas
    const regiones = new Set(fichas.map(f => f.origen.split(',')[0].trim()));
    document.getElementById('total-regiones').textContent = regiones.size;
    document.getElementById('footer-fichas').textContent = `${fichas.length} creadoras documentadas · 30,500+ en comunidad`;
    
    // Generar tabla
    generarTabla(porSeguidores);
    
    // Generar galería
    generarGaleria();
    
    // Generar gráficas
    generarGraficas(porSeguidores.slice(0, 5), porRatio.slice(0, 5));
    
    // Generar mapa
    generarMapa();
}

function generarTabla(lista) {
    const tbody = document.getElementById('tabla-body');
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
    galeria.innerHTML = '';
    
    fichas.forEach(f => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="https://raw.githubusercontent.com/dicarlophotoart-blip/estudio-douyin-2026/main/cards/${encodeURIComponent(f.archivo)}" alt="${f.nombre}" class="card-img">`;
        galeria.appendChild(card);
    });
}

function generarGraficas(topSeguidores, topRatio) {
    const chartSeg = document.getElementById('chart-seguidores');
    const chartRat = document.getElementById('chart-ratio');
    
    // Gráfica de seguidores
    chartSeg.innerHTML = '';
    const maxSeg = topSeguidores[0].seguidores;
    topSeguidores.forEach(f => {
        const altura = (f.seguidores / maxSeg) * 100;
        const div = document.createElement('div');
        div.className = 'bar-container';
        div.innerHTML = `
            <div class="bar" style="height: ${altura}px;"></div>
            <div class="bar-label">
                <span class="chino">${f.nombre}</span><br>
                <span class="pinyin">${f.pinyin}</span><br>
                <span class="numero">${f.seguidores.toFixed(2)}M</span>
            </div>
        `;
        chartSeg.appendChild(div);
    });
    
    // Gráfica de ratio
    chartRat.innerHTML = '';
    const maxRat = topRatio[0].ratio;
    topRatio.forEach(f => {
        const altura = (f.ratio / maxRat) * 100;
        const div = document.createElement('div');
        div.className = 'bar-container';
        div.innerHTML = `
            <div class="bar" style="height: ${altura}px;"></div>
            <div class="bar-label">
                <span class="chino">${f.nombre}</span><br>
                <span class="pinyin">${f.pinyin}</span><br>
                <span class="numero">${f.ratio.toFixed(2)}</span>
            </div>
        `;
        chartRat.appendChild(div);
    });
}

function generarMapa() {
    const mapa = document.getElementById('mapa-regiones');
    mapa.innerHTML = '';
    
    // Contar regiones
    const regiones = {};
    fichas.forEach(f => {
        const region = f.origen.split(',')[0].trim();
        regiones[region] = (regiones[region] || 0) + 1;
    });
    
    // Ordenar por cantidad
    const sorted = Object.entries(regiones).sort((a, b) => b[1] - a[1]);
    
    sorted.forEach(([region, count]) => {
        const div = document.createElement('div');
        div.className = 'map-item';
        div.innerHTML = `
            <div class="region">${region}</div>
            <div>${count} creadora${count > 1 ? 's' : ''}</div>
        `;
        mapa.appendChild(div);
    });
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', actualizarPagina);
