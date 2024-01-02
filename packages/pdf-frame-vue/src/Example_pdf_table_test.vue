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
                          class="cell_rect"
                          :style="{ fillStyle: '#a83232', strokeStyle: '#adadad' }"></i-rect>
                        <i-text
                          :text="col.label"
                          :width="defaultCellWidth[col.column].width"
                          :x="0"
                          :y="5"
                          class="cell_text"
                          :style="{
                            fillStyle: '#ffffff',
                            font: '9px',
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
                          :y="0"
                          class="cell_text"
                          :style="{
                            fillStyle: '#363636',
                            font: '10px Arial',
                            textbaseline: 'middle',
                            baseline: 'middle',
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
        width: 0.2
    }, {
        column: "domain",
        label: "Domain",
        width: 0.2
    }, {
        column: "os_family",
        label: "OS family",
        width: 0.2
    }, {
        column: "agent_id",
        label: "Agent Id",
        width: 0.2
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
          let y = bbox.height * 0.5 - cH.height * 0.65;
          y = y < 5 ? 5 : y;
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

    let records = [
  {
    "hostname": "DESKTOP-D3BF8JD",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463f"
  },
  {
    "hostname": "WIN-64PFSAUNP5V",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 6,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 10, 2023 5:30pm IST",
    "agent_id": "ce4ef54d250f4203843f1d9c1525d073"
  },
  {
    "hostname": "WIN19-47",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 3,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 10, 2023 5:30pm IST",
    "agent_id": "71c1dccaaf5a4c699c353c6a75359f77"
  },
  {
    "hostname": "WIN-RPGETGBCB3R",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 3,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 10, 2023 5:30pm IST",
    "agent_id": "8d24af9603ad44a6b22593d69a7ca0b2"
  },
  {
    "hostname": "WIN-1184WS16",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Opted-Out",
    "edec_count": 0,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 08, 2023 5:30pm IST",
    "agent_id": "92c4dc7179b84df59eecca9d18e6346d"
  },
  {
    "hostname": "WIN22-392",
    "domain": "ATHIRA-TA.COM",
    "os_family": "WINDOWS",
    "status": "Opted-Out",
    "edec_count": 0,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 07, 2023 10:40pm IST",
    "agent_id": "fb35fb6cecb84821984bf8c902658097"
  },
  {
    "hostname": "0DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "1DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "2DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "3DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "4DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "5DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "6DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "7DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "8DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "9DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "10DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "11DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "12DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "13DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "14DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "15DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "16DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "17DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "18DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "19DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "20DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "21DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "22DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "23DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "24DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "25DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "26DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "27DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "28DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "29DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "30DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "31DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "32DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "33DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "34DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "35DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "36DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "37DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "38DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "39DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "40DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "41DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "42DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "43DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "44DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "45DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "46DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "47DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "48DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "49DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "50DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "51DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "52DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "53DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "54DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "55DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "56DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "57DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "58DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "59DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "60DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "61DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "62DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "63DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "64DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "65DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "66DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "67DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "68DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "69DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "70DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "71DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "72DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "73DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "74DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "75DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "76DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "77DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "78DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "79DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "80DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "81DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "82DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "83DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "84DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "85DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "86DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "87DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "88DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "89DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "90DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "91DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "92DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "93DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "94DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "95DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "96DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "97DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "98DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  },
  {
    "hostname": "99DESKTOPD3BF8JDDESKTOPD3BF8JDDESKTOPD3BF8JD",
    "domain": "ATHIRA-TA.COMATHIRA-TA",
    "os_family": "WINDOWS",
    "status": "Protected",
    "edec_count": 5,
    "last_approve_time": "Dec 07, 2023 8:04pm IST",
    "last_deploy_time": "Dec 11, 2023 1:43am IST",
    "agent_id": "a2c833385691448bbeb44f638849463fa2c833385691448bbeb44f638849463"
  }
    ]


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
