AFRAME.registerComponent('places-view', {
  init: function() {
    this.createPlaces()
  },
  createPlaceImage: function(id, position) {
    const entity_1 = document.createElement('a-entity')
    entity_1.setAttribute('visible', true)
    entity_1.setAttribute('id', `place-${id}`)
    entity_1.setAttribute('position', position)
    entity_1.setAttribute('cursor-listener', {})
    entity_1.setAttribute('geometry', {primitive: 'circle', radius: 2.5})
    entity_1.setAttribute('material', {src='assets/helicopter.png', opacity: 0.9})
    return entity_1
  },
  createPlaces: function() {
    const side_view_container = document.querySelector('#side-view-container')
    let previousPositionX = -150
    let previousPositionY = 30
    for (i = 1; i <=4; i++) {
      const position = {
        x: (previousPositionX += 50),
        y: (previousPositionY += 2),
        z: -40
      }
      const entity_1 = this.createPlaceImage(i, position)
      side_view_container.appendChild(entity_1)
    }
  },
  tick: function() {
    const places_container = document.querySelector('#places-container')
    const { state } = places_container.getAttribute('tour')
    if (state == 'view' || state == 'change-view') {
      this.el.setAttribute('visible', true)
    } else {
      this.el.setAttribute('visible', false)
    }
  }
})