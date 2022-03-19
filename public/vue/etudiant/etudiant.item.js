Vue.component('etudiant-item', {
    template:
        `<div class="card">
            <div class="card-body d-flex justify-content-between">
                <div>
                    <h4 class="card-title">{{ etudiant?.name}}</h4>
                    <p class="card-text">{{ etudiant?.numero}}</p>
                </div>
                <div>
                    <button @click="remove(etudiant)" type="button" class="btn btn-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>`
    ,
    props: ['etudiant'],
    methods: {
        remove: function (etudiant) {
            if (confirm(`Êtes-vous sûr de vouloir supprimer ${etudiant.name} ?`)) {
                axios.delete(`/etudiant/${etudiant.id}`)
                    .then(() => {
                        eventBus.$emit('etudiant-delete-event');
                    })
                    .catch(err => console.log(err));
            }
        }
    },
})
