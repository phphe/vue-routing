<template>
  <iframe src="/BaiduMap.html" class="baidu-map" scrolling="no" frameborder=0 ref="ifr"></iframe>
</template>
<script>

export default {
  props: {
    // points: {}
  },
  data() {
    return {
      points: [
        [116.399, 39.910],
        [116.405, 39.920],
        [116.423493, 39.907445]
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._BaiduMapInterval = window.setInterval(() => {
        if (this.$el && this.$el.contentWindow && this.$el.contentWindow.BMap) {
          this.mapReady(this.$el.contentWindow.BMap)
          window.clearInterval(this._BaiduMapInterval)
        }
      }, 10)
    })
  },
  beforeDestroy() {
    window.clearInterval(this._BaiduMapInterval)
  },
  methods: {
    mapReady(BMap) {
      if (this.points) {
        this.convertPoints(this.points, BMap).then(({points}) => {
          var map = new BMap.Map('map')
          var center = this.getCenter(points, BMap)
          map.centerAndZoom(center, 15)
          map.enableScrollWheelZoom()

          for (let i = 0; i < points.length; i++) {
            const prev = points[i - 1]
            if (prev) {
              const current = points[i]
              const polyline = new BMap.Polyline([
                prev,
                current,
              ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5})   // 创建折线
              map.addOverlay(polyline)   // 增加折线
            }
          }
        })
      }
    },
    getCenter(points, BMap) {
      let maxX = points[0].lng
      let maxY = points[0].lat
      let minX = points[0].lng
      let minY = points[0].lat
      for (const p of points) {
        if (p.lng < minX) {
          minX = p.lng
        }
        if (p.lng > maxX) {
          maxX = p.lng
        }
        if (p.lat < minY) {
          minY = p.lat
        }
        if (p.lat > maxY) {
          maxY = p.lat
        }
      }
      return new BMap.Point((maxX + minX) / 2, (maxY + minY) / 2)
    },
    convertPoints(points, BMap) {
      const convertor = new BMap.Convertor()
      //
      const BMapPoints = []
      for (const point of points) {
        BMapPoints.push(new BMap.Point(point[0], point[1]))
      }
      //
      const promises = []
      const n = 100
      for (let i = 0, j = 0; j < points.length; i++, j += n) {
        promises.push(new Promise((resolve, reject) => {
          const start = i * n
          const end = start + n
          convertor.translate(BMapPoints.slice(start, end), 1, 5, (data) => { resolve(data) })
        }))
      }
      return Promise.all(promises).then((datas) => {
        const resultPoints = []
        for (const data of datas) {
          for (const point of data.points) {
            resultPoints.push(point)
          }
        }
        return { points: resultPoints, dataArr: datas }
      })
    }
  }
}
</script>
<style scoped>
.baidu-map{
  width: 680px;
  height: 480px;
}
</style>
