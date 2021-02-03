<template>
    <div class="main">
        <el-row class="output-main">
            <div class="main-wrapper">
                <div class="main-container">
                    <el-col :span="4" class="menu-wrapper">
                        <div class="menu-title">
                            <div class="menu-title-wrapper">
                                <p class="menu-title-content">Functions</p>
                            </div>
                        </div>
                        <el-menu
                                default-active="1"
                                background-color="#545c64"
                                text-color="#fff"
                                class="el-menu-vertical-demo">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-upload2"></i>
                                    <span>Upload</span>
                                </template>
                                <el-upload
                                        class="upload-demo"
                                        action=""
                                        ref="upload"
                                        :show-file-list="false"
                                        :http-request="upload">
                                    <el-menu-item class="upload-button-menu">
                                        <div class="upload-button">사진 업로드</div>
                                    </el-menu-item>
                                </el-upload>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-download"></i>
                                    <span>Download</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item @click="saveExcel">
                                        레포트 다운로드
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                    <el-col :span="12" class="image-block">
                        <div class="demo-image__placeholder">
                            <div class="block-container">
                                <div class="block">
                                    <el-image
                                            class="viewer"
                                            :src="src"
                                            v-loading="loading"
                                            ref="image_div"
                                            @load="imageLoaded">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8" class="data-table">
                        <template>
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="name"
                                        label="랜드마크"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="x"
                                        label="X"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="y"
                                        label="Y">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-col>
                    <span></span>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
    const assets = require('../assets/5599.jpg');
    const example_1 = require('../assets/example_1.jpg');
    const example_2 = require('../assets/example_2.jpg');
    const example_3 = require('../assets/example_3.jpg');
    const example_4 = require('../assets/example_4.jpg');
    const example_5 = require('../assets/example_5.jpg');
    const example_6 = require('../assets/example_6.jpg');
    import fileSaver from 'file-saver';
    import { mapGetters } from 'vuex';

    export default {
        name: "Output",
        data() {
            return {
                src: '',
                image: '',
                button: 'true',
                loading: false,
                active: 1,
                number: 1,
                assets,
                examples: [[example_1, '../assets/example_1.jpg'],
                    [example_2, '../assets/example_2.jpg'],
                    [example_3, '../assets/example_3.jpg'],
                    [example_4, '../assets/example_4.jpg'],
                    [example_5, '../assets/example_5.jpg'],
                    [example_6, '../assets/example_6.jpg']],
                posLoc: null,
                oriW: 0,
                oriH: 0,
                notificationInstance: null,
                temp_len: 0,
                tableData: []
            }
        },
        created() {
            window.addEventListener("resize", this.myEventHandler);
        },
        destroyed() {
            window.removeEventListener("resize", this.myEventHandler);
        },
        mounted() {
            console.log(this.token);
            if(this.token === null) this.$router.push('/login');
        },
        methods: {
            myEventHandler() {
                this.imageLoaded();
            },
            upload() {
                const formData = new FormData();
                const file = this.$refs.upload.uploadFiles[0];
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data', 'responseType': 'blob'}};
                formData.append('file', file.raw);
                this.loading = true;
                this.$axios.post('http://114.70.193.168:8888/api/fileUpload', formData, headerConfig).then(res => {
                    this.number = res.data.count;
                    this.src = `http://114.70.193.168:8888/api/image/${res.data.count}`;

                    this.$refs.upload.clearFiles();
                    this.button = false;
                    this.loading= false;
                    this.active = 2;

                    ///////////////////////////////////////////////////

                    ///////////////////////////////////////////////////

                    this.posLoc = res.data.loc;

                    this.oriH = res.data.height;
                    this.oriW = res.data.width;
                    this.tableData = [];
                    this.posLoc.forEach((data) => {
                        this.tableData.push({
                            name: data.name,
                            x: data.xpos,
                            y: data.ypos
                        })
                    })
                })
                .catch(() => {
                    this.loading = false;
                    this.$refs.upload.clearFiles();
                })
            },
            imageLoaded() {

                for (let i = 0; i < this.temp_len; i++) {
                    const elements = document.getElementsByClassName(`created-span-${i}`);
                    while (elements.length > 0) {
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                }

                const rectPos = this.getPos();
                const len = this.posLoc.length;
                this.temp_len = len;
                for (let i = 0; i < len; i++) {
                    //533 / 1714 702 / 2164
                    //const xpos = (posLoc[i].ypos * rectPos.width / oriW);
                    //const ypos = (posLoc[i].xpos * rectPos.height / oriH) - rectPos.ypos;
                    const xpos = (this.posLoc[i].ypos * rectPos.width / this.oriW) - 5;
                    const ypos = (this.posLoc[i].xpos * rectPos.height / this.oriH) - 5;

                    console.log(this.posLoc[i].ypos, rectPos.width, this.oriW, xpos);

                    const span = document.createElement("div");
                    const landmarkName = document.createElement("span");
                    span.className = `created-span-${i} circle`;

                    span.style = `
                        width: 10px;
                        height: 10px;
                        background-color: red;
                        border-radius: 50%;
                        display: inline-block;
                        cursor: pointer;
                    `;
                    span.style.position = "absolute";
                    span.style.top = `${xpos}px`;
                    span.style.left = `${ypos}px`;
                    span.customAttribute = {xpos: xpos, ypos: ypos, i: i};

                    span.onmouseover = this.dotMouseOverEvent;
                    span.onmouseout = this.dotMouseOut;
                    this.dragElement(span);

                    document.getElementsByClassName("viewer")[0].appendChild(span);

                    landmarkName.className = `landmark-span-${i}`;
                    landmarkName.textContent = this.posLoc[i].name;
                    landmarkName.style = `
                        display: inline-block;
                        width: 150px;
                        position: relative;
                        left: -20px;
                        top: -30px;
                        color: yellow;
                    `;
                    document.getElementsByClassName(`created-span-${i}`)[0].appendChild(landmarkName);
                }
            },
            dragElement(elmnt) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id + "header")) {
                    // if present, the header is where you move the DIV from:
                    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                } else {
                    // otherwise, move the DIV from anywhere inside the DIV:
                    elmnt.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            },
            dotMouseOverEvent(ele) {
                const classname = ele.path[0].className;
                const elements = document.getElementsByClassName(classname)[0];
                const i = ele.path[0].customAttribute.i;
                const style = getComputedStyle(elements);
                const rectPos = this.getPos();

                const x = ((style.left.replace('px', '') + 5) * this.oriW / rectPos.width / 10).toFixed(1);
                const y = ((style.top.replace('px', '') + 5) * this.oriH / rectPos.height / 10).toFixed(1);

                this.tableData[i].x = x;
                this.tableData[i].y = y;

                this.notificationInstance = this.$notify({
                    title: '좌표',
                    dangerouslyUseHTMLString: true,
                    message: `x좌표:${x}&nbsp y좌표:${y}`,
                    duration: 0,
                    showClose: false
                });
            },
            dotMouseOut() {
                this.notificationInstance.close();
            },
            saveExcel() {
                this.$axios.get(`http://114.70.193.168:8888/api/excel/${this.number}`, { responseType: 'blob' }).then(res => {
                    let blob = new Blob([res.data],
                        {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});
                    fileSaver.saveAs(blob, "result.xlsx");
                });
                this.getPos();
            },
            getPos() {
                const offset = document.getElementsByClassName("el-image__inner")[1].getBoundingClientRect();
                return {xpos: offset.left, ypos: offset.top, width: offset.width, height: offset.height}
            },
            savePicture() {
                let imgData = atob(this.src.split(",")[1]),
                    len = imgData.length,
                    buf = new ArrayBuffer(len),
                    view = new Uint8Array(buf),
                    blob,
                    i;
                const fileName = "result";

                for (i = 0; i < len; i++) {
                    view[i] = imgData.charCodeAt(i) & 0xff // masking
                }

                blob = new Blob([view], {
                    type: "application/octet-stream"
                });

                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName)
                } else {
                    //var url = URL.createObjectURL(blob);
                    var a = document.createElement("a")
                    a.style = "display: none"
                    //a.href = url;
                    a.href = this.src
                    a.download = fileName
                    document.body.appendChild(a)
                    a.click()

                    setTimeout(function () {
                        document.body.removeChild(a)
                        //URL.revokeObjectURL(url);
                    }, 100)
                }
            }
        },
        computed: mapGetters({
            token: "getToken"
        })
    }
</script>

<style scoped>
    .button-size {
        min-width: 250px;
    }
    .output-footer-container {
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        width: 100%;
        margin: auto;
    }
    .output-footer-wrapper {
        width: 100%;
        height: 60px;
        background-color: #545c64;
        margin: auto;
    }
    .menu-wrapper {
        background-color: #545c64;
    }
    .menu-title {
        background-color: #545c64;
    }
    .menu-title-content {
        font-family: "나눔스퀘어라운드 Bold";
        margin-left: 5px;
        color: #fff;
    }
    .output-main {
        height: 100%;
    }
    .banner {
        min-width: 275px;
        background-color: #545c64;
    }
    .main {
        width: 100%;
        height: 100%;
        position: relative;
        float: top;
    }
    .main-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .main-container {
        display: flex;
        width: 100%;
    }
    .upload-demo {
        width: 100%;
    }
    .upload-button {
        text-align: left;
    }
    .el-menu-vertical-demo {
        border: 0;
    }
    .el-upload {
        width: 100%;
    }
    .demonstration {
        border: #e4e4e5 1px solid;
        padding: 10px;
    }
    .output {
        border-bottom: #e4e4e5 1px solid;
        margin-bottom: 5px;
        margin-top: 5px;
        font-family: "나눔스퀘어라운드 Bold"
    }
    .demonstration {
        margin: 3px;
    }
    .viewer {
        display: flex;
        width: 1000px;
        max-height: 100%;
    }
    .block-container {
        padding: 30px 0 30px 0;
        width: 1002px;
        border: #e4e4e5 solid;
        border-radius: 15px;
    }
    .block {
        width: 1000px;
        height: 1300px;
    }
    .el-image {
    }
    .el-icon-picture-outline {
        width: 533.266px;
        height: 699.906px;
    }
    .save{
        width: 365px;
        margin-top: 10px;
    }
    .el-upload-list {
        visibility: hidden;
    }
    .examples-wrapper {
        margin-top: 50px;
    }
    .circle:hover {
        fill: yellow;
        stroke: yellow;
        stroke-width: 5px;
    }
</style>