<template>
    <div>
        <v-container v-if="loading">
            <v-layout row>
                <v-flex xs12 class="text-xs-center" >
                    <v-progress-circular
                             indeterminate
                             color="primary"
                             :width="7"
                             :size="70"
                             v-if="loading"
                             ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container v-else>
            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2 class="text-xs-left">
                    <v-card flat style="border: 1px solid #ccc" v-if="messages.length != 0">
                        <v-container>
                        <v-layout row wrap v-if="messages" v-for="(id, i) in messages" :key="i" class="mb-1" @click="toMess(id)" style="cursor: pointer">
                            <v-flex xs12 class="blue lighten-5 pa-3" v-if="!checkMessNotf(id).seen">
                                <v-layout row>
                                <v-flex xs3 sm2>
                                <!-- <v-avatar size="50px" class="mr-2" v-if="getUser(id).imageURL"> -->
                                <!--     <img :src="getUser(id).imageURL"> -->
                                <!-- </v-avatar> -->
                                <v-avatar size="40px" class="mr-2" v-if="!getUser(id)">
                                    <img :src="require('../../../assets/profile.svg')">
                                </v-avatar>
                                    <img style="
                                      object-fit: cover;
                                      border-radius:50%;
                                      width: 50px;
                                      height: 50px;
                                      margin-right: 2px;" 
                                      :src="getUser(id).imageURL"
                                      v-if="getUser(id)">
                                </v-flex>
                                <v-flex xs9 sm10>
                                <div v-if="getUser(id)">
                                    <h4>{{ getUser(id).name }}</h4>
                                </div>
                                <div v-else>
                                    <h4>Learny bruker</h4>
                                </div>
                                <div style="max-width: 100%; overflow: hidden">
                                {{ checkMessNotf(id).mess }}
                                </div>
                                </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 v-else class="pa-3">
                                <v-layout row>
                                <v-flex xs3 sm2>
                                <!-- <v-avatar size="50px" class="mr-2" v-if="getUser(id).imageURL"> -->
                                <!--     <img :src="getUser(id).imageURL"> -->
                                <!-- </v-avatar> -->
                                <!-- <v-avatar size="40px" class="mr-2" v-else> -->
                                <!--     <img :src="require('../../../assets/profile.svg')"> -->
                                <!-- </v-avatar> -->
                                    <img style="
                                      object-fit: cover;
                                      border-radius:50%;
                                      width: 50px;
                                      height: 50px;
                                      margin-right: 2px;" 
                                      :src="getUser(id).imageURL">
                                </v-flex>
                                <v-flex xs9 sm10>
                                <div>
                                    <h4>{{ getUser(id).name }}</h4>
                                </div>
                                <div style="max-width: 100%; overflow: hidden">
                                {{ checkMessNotf(id).mess }}
                                </div>
                                </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <h3 v-else style="color: #ccc">Ingen bestillinger enda</h3>
                        </v-container>
                    </v-card>
                    <v-card v-else flat style="border: 1px solid #ccc" >
                        <v-container>
                            <v-layout row>
                                <v-flex xs12 class="text-xs-center">
                                    <v-img
                                     :src="require('../../../assets/ch.jpg')"
                                     contain
                                     height="200"
                                     ></v-img>
                                    <h3 style="color:#455A64">Du har ingen meldinger</h3>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data () {
        return {
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        },
        getUser (){
            return this.$store.getters.getUser
        },
        messages(){
            let messages = this.$store.getters.messages
            let chatlist =  []
            if (messages){
                for (let key in messages){
                    chatlist.push(key)
                }
            }

            let p = chatlist.sort((a, b) => {
                let t =  new Date(messages[b][Object.keys(messages[b]).reverse()[0]].time) - new Date(messages[a][Object.keys(messages[a]).reverse()[0]].time)
                return t
            
            })

            return p
        },
        checkMessNotf(){
            return (id) => {
                let messages = this.$store.getters.messages
                let listMessage = messages[id]
                return {
                    seen: listMessage[Object.keys(listMessage).reverse()[0]].seen,
                    mess: listMessage[Object.keys(listMessage).reverse()[0]].message,
                }
            }
        },
        notf(){
            return this.$store.getters.notf
        },
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods: {
        toMess(id){
            this.$router.push('/chat/' + id)
        },
        track(){
            this.$ga.page('/chatlist')
        }
    }
} 
</script>
