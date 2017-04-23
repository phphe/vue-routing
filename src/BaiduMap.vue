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
        {x: 116.399, y: 39.910},
        {x: 116.405, y: 39.920},
        {x: 116.423493, y: 39.907445},
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
        var map = new BMap.Map('map')
        var center = this.getCenter(this.points)
        console.log(center)
        map.centerAndZoom(new BMap.Point(center.x, center.y), 15)
        map.enableScrollWheelZoom()

        for (let i = 0; i < this.points.length; i++) {
          const prev = this.points[i - 1]
          if (prev) {
            const current = this.points[i]
            const polyline = new BMap.Polyline([
              new BMap.Point(prev.x, prev.y),
              new BMap.Point(current.x, current.y),
            ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5})   // 创建折线
            map.addOverlay(polyline)   // 增加折线
          }
        }
      }
    },
    getCenter(points) {
      let maxX = points[0].x
      let maxY = points[0].y
      let minX = points[0].x
      let minY = points[0].y
      for (const p of points) {
        if (p.x < minX) {
          minX = p.x
        }
        if (p.x > maxX) {
          maxX = p.x
        }
        if (p.y < minY) {
          minY = p.y
        }
        if (p.y > maxY) {
          maxY = p.y
        }
      }
      return {
        x: (maxX + minX) / 2,
        y: (maxY + minY) / 2,
      }
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
