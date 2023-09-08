<template>
<v-container>
    <v-row no-gutters>
        <v-col>
            <v-sheet class="pa-2 ma-2">
                <!-- Incia la tabla -->
                <v-table height="300px">
                    <thead>
                        <!-- Primera fila -->
                        <tr>
                            <th class="text-left">
                                Autor
                            </th>
                            <th class="text-left">
                                Titulo
                            </th>
                            <th class="text-left">
                                Post
                            </th>
                        </tr>
                    </thead>
                    <!-- Insercion del cuerpo de la tabla desde -->
                    <!-- el apartado de script setup -->
                    <tbody>
                        <tr v-for="datos in listaData" :key="datos.name">
                            <td>{{ datos.nombre }}</td>
                            <td>{{ datos.titulo }}</td>
                            <td>{{ datos.post }}</td>
                        </tr>
                    </tbody>
                </v-table>
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
    // Es vital colocar la actualizacion de la tabla
    // en metofo de onMounted para asegurar la carga
    // de la pagina de manera correcta, funcion async.
    onMounted(async() => {
        await fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then((json) => listaUsuario.value = JSON.stringify(json));
        await fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json()).then((json) => listaPost.value = JSON.stringify(json));
        const usuarios = JSON.parse(listaUsuario.value);
        let posteos = JSON.parse(listaPost.value);
        //Genera un array listo para colocar los datos en la tabla
        posteos = posteos.map(function(post){
            let nombre;
            usuarios.forEach(usuario => {
                if(usuario.id == post.userId)
                    nombre = usuario.name;
            });
            return {nombre:nombre,titulo:post.title,post:post.body}
        })
        listaData.value = posteos; 
    })
</script>
