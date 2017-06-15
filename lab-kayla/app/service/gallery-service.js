'use strict'

module.exports = [
  '$q',
  '$log',
  '$http',
  'authService',
  function($q, $log, $http, authService) {
    $log.debug('Gallery Service')

    let service = {}
    service.galleries = []

    service.createGallery = (gallery) => {
      $log.debug('service.createGallery')
      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.post(`${__API_URL__}/api/gallery`, gallery, config)// eslint-disable-line
      })
      .then(res => {
        $log.log('gallery created')
        let gallery = res.data
        service.galleries.unshift(gallery)
        return gallery
      })
      .catch(err => {
        $log.error(err.message)
        return $q.reject(err)
      })
    }

    service.deleteGallery = (galleryId) => {
      $log.debug('#galleryService.deleteGallery')

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/gallery/${galleryId}/` // eslint-disable-line
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
          }
        }
        return $http.delete(url, config)// eslint-disable-line
      })
      .then(res => {
        $log.log('gallery deleted')
        service.galleries.filter((ele, idx) => {
          if(ele._id === galleryId) service.galleries.splice(idx, 1);
        })
        return res.status
      })
        .catch(err => {
          $log.error(err.message)
          return $q.reject(err)
        })
    }

    service.fetchGalleries = () => {
      $log.debug('#service.fetchGalleries')
      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.get(`${__API_URL__}/api/gallery`, config) // eslint-disable-line
      })
      .then(res => {
        $log.log('galleries retrieved')
        service.galleries = res.data
        return res.data
      })
      .catch(err => {
        $log.error(err.message)
        $q.reject(err)
      })
    }

    service.updateGallery = (galleryId, gallery) => {
      $log.debug()

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/gallery/${galleryId}` // eslint-disable-line
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.put(url, gallery, config)
      })
      .then(res => {
        service.galleries.forEach((ele, idx) => {
          if(ele._id === res.data._id) service.galleries[idx] = res.data
        })
        return res.data
      })
      .catch(err => {
        $log.error(err.message)
        return $q.reject(err)
      })
    }
    return service
  }
]
