"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length != 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null) {
        isValid = isValid && +validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null) {
        isValid = isValid && +validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// Autobind decorator
function Autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDesc = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDesc;
}
// ProjectInput class
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherInputs() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        const titleValidatable = {
            value: title,
            required: true,
        };
        const descValidatable = {
            value: description,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: people,
            required: true,
            min: 2,
            max: 5
        };
        if (!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
            alert('Invalid inputs!');
            return;
        }
        else {
            return [title, description, +people];
        }
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherInputs();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInp = new ProjectInput();
//# sourceMappingURL=app.js.map