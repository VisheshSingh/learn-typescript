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

        if(title.trim().length === 0 || description.trim().length === 0 || people.trim().length ===0) {
            alert('Invalid inputs!, Please find in correct details');
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