<template>
                    <v-card flat style="border: 1px solid #ccc; max-height: 100%;">
                        <v-container>
                            <v-layout v-if="messages" row v-for="(message, i) in messages" :key="`${i}-${message.id}`" class="mb-2">
                                <v-flex xs12 class="text-xs-right" v-if="message.id === user.id">
                                    <v-layout row wrap class="text-xs-right" >
                                        <v-flex xs9 sm10 md11>
                                            <p @mouseover="setShowDate(i)" @mouseleave="setShowDate(-1)" class="primary lighten-4 text-xs-left" style="float:right; border-radius: 10px; padding:10px 16px; color: #455A64; font-size: 120%; overflow-wrap: break-word; max-width: 100%; cursor: pointer">{{ message.message }}
                                            </p>
                                            <p v-if="showDate == i" class="mr-2 blue-grey lighten-5 text-xs-left" style="float:right; border-radius: 10px; padding:10px 16px; color: #455A64; font-size: 120%; overflow-wrap: break-word; max-width: 100%">{{ message.time | date  }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs3 sm2 md1>
                                            <!-- <v-avatar size="40px" @click="toChat(message.id)" style="cursor: pointer" v-if="getUser(message.id).imageURL"> -->
                                            <!--     <img :src="getUser(message.id).imageURL"> -->
                                            <!-- </v-avatar> -->
                                            <!-- <v-avatar size="40px" @click="toChat(message.id)" style="cursor: pointer" v-if="!getUser(message.id).imageURL"> -->
                                            <!--     <img :src="require('../../../assets/profile.svg')"> -->
                                            <!-- </v-avatar> -->
                                    <img    
                                    @click="toChat(message.id)"
                                    style="
                                      object-fit: cover;
                                      border-radius:50%;
                                      cursor: pointer;
                                      width: 40px;
                                      cursor: pointer;
                                      height: 40px;" 
                                      :src="getUser(message.id).imageURL">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 class="text-xs-left" v-else>
                                    <v-layout row wrap>
                                        <v-flex xs3 sm2 md1>
                                            <!-- <v-avatar size="40px" @click="toChat(message.id)" style="cursor: pointer" v-if="getUser(message.id).imageURL"> -->
                                            <!--     <img :src="getUser(message.id).imageURL"> -->
                                            <!-- </v-avatar> -->
                                            <v-avatar v-if="!getUser(message.id)" size="40px" @click="toChat(message.id)" style="cursor: pointer">
                                                <img :src="require('../../../assets/profile.svg')">
                                            </v-avatar>
                                    <img 
                                    @click="toChat(message.id)"
                                                                                                                                                              v-if="getUser(message.id)"
                                    style="
                                      object-fit: cover;
                                      border-radius:50%;
                                      width: 40px;
                                      cursor: pointer;
                                      height: 40px;" 
                                      :src="getUser(message.id).imageURL">
                                        </v-flex>
                                        <v-flex xs9 sm10 md11>
                                            <p @mouseover="setShowDate(i)" @mouseleave="setShowDate(-1)" class="green lighten-4 text-xs-left" style="float:left; border-radius: 10px; padding:10px 16px; color: #455A64; font-size: 120%; overflow-wrap: break-word; max-width: 100%; cursor: pointer">{{ message.message }}
                                            </p>
                                            <p v-if="showDate == i" class="ml-2 blue-grey lighten-5 text-xs-left" style="float:left; border-radius: 10px; padding:10px 16px; color: #455A64; font-size: 120%; overflow-wrap: break-word; max-width: 100%">{{ message.time | date  }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row v-if="!messages" align-center>
                                <v-flex xs12 class="text-xs-center">
                                    <v-img
                                     :src="require('../../../assets/chat.jpg')"
                                     contain
                                     height="150"
                                     ></v-img>
                                    <h3 style="color:#455A64">Start en samtale</h3>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <span></span>
                        {{ seenMessageMut}}
                    </v-card>
</template>

<script>
export default {
    props: ['id'],
    data () {
        return {
            showDate: ""
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
            let messages =  this.$store.getters.messages
            if (messages){
                return messages[this.$props.id]
            } else {
                return messages
            }
        },
        error(){
            return this.$store.getters.error
        },
        seenMessageMut(){
            this.seenMessage()
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods: {
        toChat(id){
            this.$router.push('/profile/' + id)
        },
        setShowDate(id){
            this.showDate = id
        },
        seenMessage(){
            let messages = this.messages
            if (messages){
                this.$store.dispatch('seenMessage', {
                        mess: messages,
                        id: this.$props.id,
                        userid: this.user.id
                })
            }
        }
    },
    updated(){
    },
    created() {
    }
} 
</script>
