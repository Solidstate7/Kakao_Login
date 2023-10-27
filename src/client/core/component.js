class Component {
    target;
    props;
    state = {};

    constructor(target, props) {
        this.target = target;
        this.props = props;
        this.setup();
        this.setEvent();
        this.render();
    }

    setup() {}

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    template() {}

    mounted() {}

    render() {
        this.target.innerHTML = this.template();
        this.mounted();
    }

    addEvent(eventType, selector, callback) {
        this.target.addEventListener(eventType, function (e) {
            if (!e.target.closest(selector)) return false;
            callback(e);
        });
    }

    setEvent() {}
}

export default Component;
