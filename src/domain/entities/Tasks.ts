export interface ChecklistItem{
    id: string,
    description: string,
    isCompleted: boolean
}

export class Task{
    constructor(
        public readonly id: string,
        public title: string,
        public date: Date,
        public checklist: ChecklistItem[],
        public readonly creatorId: string,
        public assignedId: string,
        public createdAt: Date,
        public completedAt?: Date | null
    ){}

    public markAsCompleted(){
        this.completedAt = new Date()
    }

    public markAsIncomplete(){
        this.completedAt = null
    }

    public updateChecklistItem(itemId:string, isCompleted: boolean){
        const item = this.checklist.find(i => i.id  === itemId)
        if(item){
            item.isCompleted = isCompleted
        }
    }
}