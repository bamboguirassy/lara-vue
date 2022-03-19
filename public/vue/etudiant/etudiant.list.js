const EtudiantListComponent = {
    template:
        `<div class="row">
            <h1 class="col-12">Liste des étudiants</h1>
            <hr>
            <div class ="form-group col-12">
            <label for="searchField">Chercher</label>
            <input type ="text"
            class ="form-control" name="searchField" id="searchField" placeholder="Chercher">
            </div>
            <hr>
            <div class ="col-4 my-3" v-for="etudiant in etudiants">
            <etudiant-item :etudiant="etudiant"></etudiant-item>
            </div>
            <div class="col-md-12 d-flex justify-content-center">
                <nav aria-label="Page navigation">
                  <ul class="pagination">
                    <li class="page-item" :class="{disabled: data.current_page==1}">
                      <a class="page-link" @click="paginate(data.current_page-1)" aria-label="Précédent">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Précédent</span>
                      </a>
                    </li>
                    <li v-for="index in pageArray" class="page-item" :class="{active:data.current_page==index}">
                        <a class="page-link" @click="paginate(index)">{{index}}</a>
                    </li>
                    <li class="page-item"  :class="{disabled: data.current_page==data.last_page}">
                      <a class="page-link" @click="paginate(data.current_page+1)" aria-label="Suivant">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Suivant</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
        </div>`
    ,
    data() {
        return {
            etudiants: [],
            data: {},
        }
    },
    methods: {
        findAll: function () {
            axios.get('/etudiant')
                .then(response => {
                    this.data = response.data;
                    response = response.data;
                    this.etudiants = response.data;
                }).catch(err => console.log(err));
        },
        paginate: function(pageNumber) {
            axios.get(`/etudiant?page=${pageNumber}`)
                .then(response => {
                    this.data = response.data;
                    response = response.data;
                    this.etudiants = response.data;
                }).catch(err => console.log(err));
        }
    },
    mounted() {
        this.findAll();
    },
    created() {
        let that = this;
        eventBus.$on("etudiant-delete-event", function () {
            that.findAll();
        })
    },
    computed: {
        pageArray: function () {
            let arr = [];
            for (let i = 1; i <= this.data.last_page; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
}
