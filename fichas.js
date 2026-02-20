// Archivo temporal para poder guardar
function generarMapa() {
    const mapDiv = document.getElementById('chinaMap');
    if (!mapDiv) return;
    
    const chart = echarts.init(mapDiv);
    
    chart.setOption({
        series: [{
            type: 'map',
            map: 'china',
            data: [
                { name: '四川省', value: 4 },
                { name: '辽宁省', value: 2 },
                { name: '北京市', value: 1 }
            ]
        }]
    });
}

function actualizarPagina() {
    // Temporalmente vacía
    console.log('Página actualizada');
}
