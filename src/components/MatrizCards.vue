<template>
<v-container class="bg-surface-variant">
    <v-row no-gutters>
        <v-col v-for="n in tope" 
        :key="n" 
        cols="12" 
        sm="12" 
        md="6" 
        lg="3">
            <v-sheet class="ma-2 pa-3" max-width="500">
                <v-card class="h" max-width="500">
                    <v-img :src="imagenes[n]" height="300px" cover></v-img>
                    <v-card-title>
                        {{titulos[n]}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{nombres[n]}}
                    </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-expansion-panels>
                        <v-expansion-panel
                            title="Expandir Post"
                        >
                            <v-expansion-panel-text >
                            {{posts[n]}}
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-sheet>
        </v-col>
        <v-col>
            <v-sheet class="ma-2 pa-3" max-width="210">
                <v-btn @click=incrementar()>Cargar mas posts</v-btn>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>



<script setup>
    import { ref,onMounted } from 'vue';
    const listaUsuario = ref(null);
    const listaPost = ref(null);
    const listaData = ref([]);
    const nombres = ref([]);
    const posts = ref([]);
    const titulos = ref([]);
    const imagenes = ref([]);
    const tope = ref(5);
    
    function incrementar(){
        tope.value += 5;
    }

    onMounted(async() => {
        let posteos;
        let usuarios;

        /*
        * Bloque de codigo correspondiente al acceso de informacion
        * de los posts.
        */
        await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => listaUsuario.value = JSON.stringify(json));

        await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => listaPost.value = JSON.stringify(json));

        usuarios = JSON.parse(listaUsuario.value);
        posteos = JSON.parse(listaPost.value);

        //Genera un array listo para colocar los datos en la tabla
        posteos = posteos.map(function(post){
            let nombre;
            //Cambiare esto algun dia por un do while... 
            //o un break (si es que existe en javascript).
            usuarios.forEach(usuario => {
                if(usuario.id == post.userId)
                    nombre = usuario.name;
            });
            return {id:post.id,nombre:nombre,titulo:post.title,post:post.body};
        })
        Object.assign(listaData.value,posteos);

        /*
        * Bloque de codigo en el que la informacion se segmenta
        * y se consiguen las imagenes individuales para cada
        * post.
        */
        let response;
        for (let i = 0; i < listaData.value.length; i++) {
            response = await fetch("https://random.imagecdn.app/300/400",{
                method: "GET",
                headers:{
                    "Content-type": "aplication/json"
                }
            });
            nombres.value[i] = listaData.value[i].nombre;
            posts.value[i] = listaData.value[i].post;
            titulos.value[i] = listaData.value[i].titulo;
            imagenes.value[i] = response.url;
        }
        
    })
</script>