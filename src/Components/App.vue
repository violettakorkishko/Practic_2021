<template>
   <div class="container" >
        <div class="list">
            <input class="search" type="text" v-model="search" placeholder="Search...">
            <table>
                <tr class="row" v-for="st in students" v-bind:key='st._id'>
                    <td class="column">{{st._id}}</td>
                    <td class="column"
                    v-bind:style="findName(st)">
                        {{st.name}}
                    </td>
                    <td class="photo">
                        <img class="img" :src="st.photo" alt="student photo">
                    </td>
                    <td class="column">{{st.group}}</td>
                    <td class="column">{{st.mark}}</td>
                    <td class="column">
                        <input type="checkbox"
                            name="practic"
                            :checked="st.isDonePr"
                            v-on:click="toggleChecked(st)"
                            >
                    </td>
                    <td class="column">
                        <button v-on:click="deleteElement(st)">Видалити</button>
                    </td>
                    <td class="ico">
                        <img class="img" v-on:click="updateStudent(st)" src="https://image.flaticon.com/icons/png/512/61/61456.png" alt="pancil">
                    </td>
                </tr>
            </table>
            <div class="add-row">
                <div>
                    <span style="font-size:15px;">Name:</span>
                    <input  v-model.lazy="stud.name"  type="text">
                </div>
                <div>
                    <span style="font-size:15px;">Group: </span>
                    <input v-model.lazy="stud.group">
                </div>
                <div>
                    <span style="font-size:15px;">Mark:</span>
                    <input v-model.number="stud.mark" type="number">
                </div>
                <div>
                    <span style="font-size:15px;">isDone: </span>
                    <input type="checkbox" v-model="stud.isDodePr">
                </div>
                <button v-if="!isUpdate" v-on:click="newStud()">Добавить</button>
                <button v-if="isUpdate" v-on:click="sendUpdateStudent()">Оновити</button>

            </div>
        </div>
   </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data () {
            return {
                search: '',
                students: [],
                newmark:'',
                newgroup:'',
                newname:'',
                piece:'',
                stud: {
                    _id: '',
                    name: '',
                    mark: '',
                    isDodePr: false,
                    group: '',
                },
                isUpdate: false,
            };
        },
        mounted (){
            Vue.axios.get("http://46.101.212.195:3000/students").then((response) => {
                console.log(response.data)
                this.students = response.data;
            })
        },
        methods: {
            getStudents: function () {
                Vue.axios.get("http://46.101.212.195:3000/students").then((response) => {
                    console.log(response.data)
                    this.students = response.data;
                })
            },
            toggleChecked: function (item) {
                (item.isDonePr = !item.isDonePr);
                console.log(this.students)
            },
            deleteElement: function (item) {
                 Vue.axios.delete(`http://46.101.212.195:3000/students/${item._id}`).then((response) => {
                    console.log(response.data)
                    this.getStudents();

                })
            },
            findName: function (item) {
                return item.name.toLowerCase().indexOf(this.search.toLowerCase())>-1 && this.search.length >0 ? 'background-color:green' : 'background-color:#fff'
            },
            newStud: function (){
                 Vue.axios.post("http://46.101.212.195:3000/students", {
                    name: this.stud.name,
                    group: this.stud.group,
                    mark: this.stud.mark,
                    isDodePr: this.stud.isDodePr,
                }).then((r)=>{
                    console.log(r);
                    this.getStudents();
                });

            },
            updateStudent: function (item){
                this.stud._id = item._id;
                this.stud.name = item.name;
                this.stud.group = item.group;
                this.stud.mark = item.mark;
                this.stud.isDodePr = item.isDodePr;
                this.isUpdate = true;
            },
            sendUpdateStudent: function (){
                Vue.axios.put(`http://46.101.212.195:3000/students/${this.stud._id}`, {
                    name: this.stud.name,
                    group: this.stud.group,
                    mark: this.stud.mark,
                    isDodePr: this.stud.isDodePr,
                }).then((r)=>{
                    console.log(r);
                    this.getStudents();
                });
                this.isUpdate = false;
            }
        },
    }
</script>
