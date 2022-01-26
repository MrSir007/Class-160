AFRAME.registerComponent('tour', {
  schema: {
    state: {type: 'string', default: 'places-list'},
    selectedCard: {type: 'string', default: '#card_1'}
  },
  init: function() {
    this.placesContainer = this.el
    this.createCards()
  },
  createCards: function() {
    const imageRef = [
      {
        id: 'taj_mahal',
        title: 'Taj Mahal',
        url: 'assets/taj_mahal.png'
      },
      {
        id: 'budapest',
        title: 'Budapest',
        url: 'assets/budapest.jpg'
      },
      {
        id: "eiffel_tower",
        title: "Eiffel Tower",
        url: "./assets/eiffel_tower.jpg",
      },
      {
        id: "new_york_city",
        title: "New York City",
        url: "./assets/new_york_city.png"
      }
    ]

    let previousXPosition = -60
    for (var item of imageRef) {
      const posX = previousXPosition + 25
      const posY = 10
      const posZ = -40
      const position = {
        x: posX,
        y: posY,
        z: posZ
      }
      previousXPosition = posX

      const border_1 = this.createBorder(position, item.id)
      const image_1 = this.createImage(item)
      border_1.appendChild(image_1)
      const title_1 = this.createTitle(position, item)
      border_1.appendChild(title_1)
      this.placesContainer.appendChild(border_1)
    }
  },
  createBorder: function(position, id) {
    const entity_1 = document.createElement('a-entity')
    entity_1.setAttribute('id', id)
    entity_1.setAttribute('visible', true)
    entity_1.setAttribute('geometry', {primitive: 'ring', radiusInner: 9, radiusOuter: 10})
    entity_1.setAttribute('position', position)
    entity_1.setAttribute('material', { color: 'black', opacity: 0.4 })
    entity_1.setAttribute('cursor-listener', {})
    return entity_1
  },
  createImage: function(item) {
    const entity_1 = document.createElement('a-entity')
    entity_1.setAttribute('visible', true)
    entity_1.setAttribute('geometry', {primitive: 'circle', radius: 9})
    entity_1.setAttribute('material', { src: item.url })
    return entity_1
  },
  createTitle: function(position, item) {
    const entity_1 = document.createElement('a-entity')
    entity_1.setAttribute('text', { font: 'exo2bold', align: 'center', width: 70, color: 'black', value: item.title })
    const positionEL = position
    positionEL.y = -20
    entity_1.setAttribute('position', positionEL)
    entity_1.setAttribute('visible', true)
    return entity_1
  },
  hideEL: function(eList) {
    eList.map((el) => {
      el.setAttribute('visible', false)
    })
  },
  showView: function() {
    const { selectedCard } = this.data
    const sky_1 = document.querySelector('#main-container')
    sky_1.setAttribute('material', {src:`./assets/360_images/${selectedCard}/place-0.jpg`, color: 'white'})
  },
  tick: function() {
    const { state } = this.el.getAttribute('tour')
    if (state == 'view') {
      this.hideEL([this.placesContainer])
      this.showView()
    }
  }
})