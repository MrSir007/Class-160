AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function () {
    this.handleMouseEnterEvents()
    this.handleMouseLeaveEvents()
    this.handleClickEvents()
  },

  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj_mahal", "budapest", "new_york_city", "eiffel_tower"]
    if (placesId.includes(id)) {
      const placesContainer = document.querySelector("#places-container")
      placesContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      })
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      })
    }
  },
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    })
  },
  handleMouseLeaveEvents: function () {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`)
        const id = el.getAttribute('id')
        if (id == selectedItemId) {
          el.setAttribute('material', {color: 'darkgrey', opacity: 1})
        } 
      }
    })
  },
  handleClickEvents: function() {
    this.el.addEventListener('click', (event) => {
      const placesContainer = document.querySelector("#places-container")
      const { state } = placesContainer.getAttribute('tour')
      if (state === 'places-list') {
        const id = this.el.getAttribute('id')
        const placesId = ["taj_mahal", "budapest", "new_york_city", "eiffel_tower"]
        if (placesId.includes(id)) {
          placesContainer.setAttribute('tour', {state: 'view', selectedCard: id})
        }
      }
      if (state === 'view') {
        this.handleViewState()
      } else if (state === 'change-view') {
        this.handleViewState()
      }
    })
  },
  handleViewState: function() {
    const el = this.el
    const id = el.getAttribute('id')
    const places_container = document.querySelector('#places-container')
    const { selectedItemId } = places_container.getAttribute('cursor-listener')
    const sideViewPlacesId = ['place-1', 'place-2', 'place-3', 'place-4']
    if (sideViewPlacesId.includes(id)) {
      placesContainer.setAttribute('tour', {state: 'change-view'})
      const sky_1 = document.querySelector('#main-container')
      sky_1.setAttribute('material', {src: `assets/360_images/${selectedItemId}/${id}.jpg`})
    }
  }
})