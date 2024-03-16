<template>
    <div class="pdfContainer">
        <pdfFrame
            :id="id"
            type="pdf"
            :width="pdfCfg.width"
            :height="pdfCfg.height"
            :config="configObj"
            @on-ready="callMethod">
            <i-page>
                <i-group
                    ref="tablecomp"
                    class="tableParent"
                    :transform="
                      (el) => {
                        let t = getRowTransform(el);
                        return t;
                      }
                    ">
                    <i-group class="header" block>
                      <i-group
                        v-for="(col, index) in columns"
                        :key="col.column"
                        class="cell"
                        :transform="getCellTransform(index, defaultCellWidth[col.column].x)">
                        <i-rect
                          :height="26"
                          :width="defaultCellWidth[col.column].width"
                          :x="0"
                          :y="0"
                          :rx= 3
                          :ry= 3
                          class="cell_rect"
                          :style="{ fillStyle: '#008080'}"></i-rect>
                        <i-text
                          :text="col.label"
                          :width="defaultCellWidth[col.column].width"
                          :x="0"
                          :y="10"
                          class="cell_text"
                          :style="{
                            fillStyle: '#ffffff',
                            font: '12px',
                            textbaseline: 'middle',
                            align: 'center',
                            baseline: 'middle',
                          }"></i-text>
                      </i-group>
                    </i-group>
                    <i-group
                      v-for="(item, index) in records"
                      :key="index"
                      :class="index + '-header'"
                      block
                      :class_="
                        (el) => {
                          return setLinePosition(el);
                        }
                      ">
                      <i-group
                        v-for="(col, ind) in columns"
                        :key="ind"
                        class="cell"
                        :transform="getCellTransform(ind, defaultCellWidth[col.column].x)">
                        <i-text
                          :text="getColumnText(item, col)"
                          :width="defaultCellWidth[col.column].width - 10"
                          :x="5"
                          class="cell_text"
                          :style="{
                            fillStyle: '#363636',
                            font: '10px Arial',
                            textbaseline: 'middle',
                            baseline: 'middle',
                            textAlign: 'center'
                          }"></i-text>
                      </i-group>
                      <i-line
                        :x1="0"
                        :y1="0"
                        :x2="pdfCfg.width - 100"
                        :y2="0"
                        class="cell_line"
                        :style="{ strokeStyle: '#e3e3e3' }"></i-line>
                    </i-group>
                  </i-group>
            </i-page>
        </pdfFrame>
    </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  let pdfConfig = {
    margins: {
        top: 30,
        bottom: 20
    }
  }

  // margin: 50,
  let instance = null;
  const configObj = {
      margins: {
        top: 50,
        bottom: 50,
        left: 0,
        right: 0
      }
  };
  const pdfCfg = {
      height: 900,
      width: 707,
  };

  let columns = [{
        column: "hostname",
        label: "Hostname",
        width: 0.3
    }, {
        column: "domain",
        label: "Domain",
        width: 0.3
    }, {
        column: "os_family",
        label: "OS family",
        width: 0.3
    }]


  const defaultCellWidth = computed(() => {
      const width = pdfCfg.width;
      const defaultWidth = width / columns.length;
      let runningWidth = 0;
      const columnWidth = columns.reduce((p, c) => {
            p[c.column] = {
              width: c.width * width || defaultWidth,
              x: runningWidth * width,
            };
            runningWidth += c.width;
            return p;
          }, {});
      return columnWidth;
    });

    // const runningIndex = 0;

    function getRowTransform(el) {
      let runningY = 0;
      el.children.forEach((n) => {
        n.updateBBox();
        const bbox = n.getBBox();
        n.setAttr("transform", {
          translate: [50, runningY],
        });

        n.fetchEls(".cell").forEach(function (c) {
          const cH = this.getBBox();
          const t = this.getAttr("transform");
          let textEl = this.fetchEl("text");
          let y = textEl.getAttr("y");
          let bbY = bbox.height * 0.5 - cH.height * 0.65;
          y = y !== undefined ? y : (bbY < 5 ? 5 : bbY);
          this.fetchEl("text").setAttr("y", y);
          // this.setAttr("transform", {
          //     translate: [t.translate[0], bbox.height * 0.5 - cH.height * 0.65],
          // });
        });
        runningY += bbox.height < 30 ? 30 : bbox.height * 1 + 12.5;
      });
      return "translate(0,0)";
    }

    function setLinePosition(el) {
      el.updateBBox();
      const pDom = el.dom;
      const y = pDom.BBox.height || 0;
      const line = el.fetchEl("line");
      if (line) {
        line.setAttr("y1", y + 15).setAttr("y2", y + 15);
      }
      return "record";
    }

    function getCellTransform(index, x) {
      return "translate(" + x + ",0)";
    }

    function getColumnText(record, column) {
      return record[column.column] || "";
    }

    let records = (new Array(100).fill(0)).map((d, i)=> {
      return {
          "hostname": "MOB-DESKTOP-"+ i +"-D064",
          "domain": "Map-fin"+ (i % 10 )+"-srs",
          "os_family": "WINDOWS",
          "status": "Protected",
          "edec_count": 5,
          "last_approve_time": "Dec 07, 2023 8:04pm IST",
          "last_deploy_time": "Dec 11, 2023 1:43am IST"
        }
      });
    function callMethod (l) {
        console.log(l);
    }
</script>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
  }

.pdfContainer {
  height: 100%;
  width: 100%;
}
</style>
