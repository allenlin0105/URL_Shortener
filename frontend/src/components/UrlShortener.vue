<template>  
  <!-- Main -->
  <main id="main">
    <div class="container">
      <section>
        <div class="url-form">
          <div class="section-title"><span>Paste the URL and expired time (format: hh:mm)</span></div>
          <div class="url-input">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter your URL" v-model="urlInput">
              <button class="btn btn-outline-secondary green-btn-bg" type="button" @click="addUrl(urlInput)">Enter</button>
            </div>
            <div class="input-group mb-3">
              <Datepicker v-model.lazy="timeInput" placeholder="Enter expired time (format: HH:MM)" timePicker />
            </div>
            <div class="shorten-url" v-if="shortenedUrl != ''">縮短網址： {{ shortenedUrl }}</div>
          </div>
        </div>
      </section>
      <section>
        <div class="url-history">
          <div class="section-title"><span>URL History</span></div>
          <div class="url-list">
            <button v-for="url in urlHistory"  :key="url" :value="url"
            class="btn url-btn" type="button" @click="pastUrl(url)">{{ url }}</button>
          </div>
        </div>
      </section>
    </div>    
    <!-- Check Modal -->
    <div class="modal fade" id="reminderModal" tabindex="-1" aria-labelledby="reminderModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p>縮短網址：</p>
          </div>
          <div class="modal-body">
            <p>{{ shortenedUrl }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn green-btn-bg" data-bs-dismiss="modal">確定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Check Modal -->    
  </main>
  <!-- End Main -->
</template>

<script>
import { on, select } from 'assets/js/shortcut.js'
import { Modal } from 'bootstrap'
import axios from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'UrlShortener',
  data() {
    return {
      urlInput: '',
      timeInput: {
        hours: 10,
        minutes: 0,
        seconds: 0
      },
      shortenedUrl: '',
      urlHistory: [
        'https://www.shorturl.at/',
        'https://getbootstrap.com/',
        'https://ithelp.ithome.com.tw/'
      ]
    }
  },
  components: { Datepicker },
  methods: {
    addUrl(url){
      if(!this.urlHistory.includes(url)){
        this.urlHistory.push(url);
      }        
      
      var seconds = this.timeInput.hours * 3600 + this.timeInput.minutes * 60;
      var response = null;
      var reminderModal = new Modal(select('#reminderModal'));
      var ipAddress = '/api/';

      console.log(ipAddress + 'urlgen');
      axios.post(ipAddress + 'urlgen',{
        'url': this.urlInput,
        'expiry': seconds
      })
      .then(info => (console.log(info)))
      .catch(error => (console.log(error)));  

      setTimeout(() => {
        console.log(ipAddress + response);
        if(response != null){
          this.shortenedUrl = ipAddress + response;
          reminderModal.show();
        }
      }, 300);
    },
    pastUrl(url){
      this.urlInput = url;
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/_variables.scss';

.url-form{
  width: 500px;  
  .url-input{
    height: auto;
  }
  .shorten-url{
    color: $green-active;
  }
}

.url-list{
  min-height: 28px;
  width: 500px; 
  .url-btn{
    width: 100%;
    border: 1px solid $grey;
    overflow: hidden;	
    background: #fff;
    color: $green-default;
    &:first-child{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child{
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    &:not(:first-child){
      margin-top: -1px;
    }
    &:not(:first-child):not(:last-child){
      border-radius: 0;
    }
    &:hover{
      color: #fff;
      background: $green-hover;
    }
    &:active{
      color: #fff;
      background: $green-active;
    }
    &:disabled{
      color: $green-disabled;
      background: #fff;
    }
  }
}
</style>