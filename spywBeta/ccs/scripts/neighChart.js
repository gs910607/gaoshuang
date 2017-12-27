var response = {
    status: 0,
    data: {
        area: ['淮阴区','淮安区','洪泽区','涟水县','金湖县','清江浦区','盱眙县'],
        success: [123,24,3,456,2,345,23],
        defeated: [11,33,4,4,560,66,7],
        unknown: [11,33,4,4,560,66,7]
    }
}
statisticsChart.init({
    type: 'POST',
    url: '/spywBeta/videoNeighborhood/queryNeighCharts.do',
    data: {
        category: true
    }
})