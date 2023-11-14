const draggabls = document.querySelectorAll('.draggable')
const contents = document.querySelectorAll('.content')

draggabls.forEach(dragItem => {
    dragItem.addEventListener('dragstart', () => {
        // console.log('drag start');
        dragItem.classList.add('dragging')
    })

    dragItem.addEventListener('dragend', () => {
        dragItem.classList.remove('dragging')
    })
})

contents.forEach(item => {
    item.addEventListener('dragover', (e) => {
        e.preventDefault()
        let afterEl = drag(item, e.clientY)
        let dragEl = document.querySelector('.dragging')

        if (afterEl == null) {
            item.appendChild(dragEl)
        } else {
            item.insertBefore(dragEl, afterEl)
        }

    })
})

function drag(item, y) {
    const draggableElements = [...item.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element

}

