// Validation helpers
interface Validatable  {
    value: string | number;
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if(validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length != 0
    }
    if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength
    }
    if(validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength
    }
    if(validatableInput.min != null) {
        isValid = isValid && +validatableInput.value >= validatableInput.min
    }
    if(validatableInput.max != null) {
        isValid = isValid && +validatableInput.value <= validatableInput.max
    }
    return isValid;
}

// Autobind decorator
function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDesc: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn;
        }
    }
    return adjustedDesc
}
// ProjectInput class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure()
        this.attach();
    }

    private gatherInputs(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true,
        }

        const descValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: people,
            required: true,
            min: 2,
            max: 5
        }

        if(!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
            alert('Invalid inputs!');
            return
        } else {
            return [title, description, +people]
        }
    }

    @Autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherInputs()
        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people)
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element)
    }
} 

const prjInp = new ProjectInput();