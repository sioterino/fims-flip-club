class Dialog {

    #data = {}

    constructor(element, button) {
        this.dialog = element
        this.form = element.querySelector('form')

        this.button = button
        this.cancel = this.dialog.querySelector('.cancel-button')

        this.#init()
    }

    #init() {
        this.button.addEventListener('click', () => this.#showModal())
        this.cancel.addEventListener('click', () => this.#closeModal())
        this.form.addEventListener('submit', e => this.#formSubmit(e))
    }

    #showModal() {
        this.dialog.showModal()
    }

    #closeModal() {
        this.dialog.close()
        this.form.reset()
    }

    #formSubmit(e) {
        e.preventDefault()

        const input = new FormData(this.form)
        input.forEach((val, key) => {
            this.#data[key] = val
        })

        this.form.reset()
    }

    get data() {
        if (Object.keys(this.#data).length === 0) return null

        const output = this.#data
        this.#clearData()

        return output
    }

    #clearData() {
        this.#data = {}
    }

}

export { Dialog }