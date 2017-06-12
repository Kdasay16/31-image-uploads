'use strict'

module.exports = [
  '$q', '$log', '$http', 'Upload', 'authService',
  function($q, $log, $http, Upload, authService) {
    $log.debug('Pic Service')

    let service = {}

    service.uploadPic = function(gallery, pic) {
      $log.debug('#picService.uploadPic')

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`// eslint-line-disable
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
        console.log('token set')
        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: pic.name,
            description: pic.description,
            file: pic.file
          }
        })
      })
      .then(res => {
        gallery.pics.push(res.data)
        console.log(gallery);
        return res.data
      },
      err => {
        $log.error(err.message)
        $q.reject(err)
      })
    }
    service.deletePic = (gallery, pic) => {
      $log.debug('#picService.deletePic')

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}/pic/${pic._id}`
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
        return $http.delete(url, config)
      })
      .then(
        () => {
          $log.log('deleted pic')

          for(let i = 0; i < gallery.pics.length; i++) {
            if(gallery.pics[i]._id === pic._id) {
              gallery.pics.splice(gallery[i], 1)
              break
            }
          }
        },
        err => {
          $log.error(err.message)
          return $q.reject(err)
        }
      )
    }
    return service
  }
]
