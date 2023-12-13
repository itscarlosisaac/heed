class AblesEventFactory {
    private static _instance: AblesEventFactory;
    private static _events = {
        drag: {
            started: 'STARTED',
            moved: 'MOVED',
            ended: 'ENDED',
        },
        select: {
            started: 'STARTED',
            ended: 'ENDED',
        },
        resize: {
            started: 'STARTED',
            moved: 'MOVED',
            ended: 'ENDED',
        },
        rotate: {
            started: 'STARTED',
            moved: 'MOVED',
            changed: 'CHANGED'
        },
    };
    
    public static get events() {
        return AblesEventFactory._events;
    }
    private constructor() {}
    
    public static get instance(): AblesEventFactory {
        if (!AblesEventFactory._instance) {
            AblesEventFactory._instance = new AblesEventFactory();
        }
        return AblesEventFactory._instance;
    }
    
    public create_event(eventName: string, eventArgs?: any): CustomEvent {
        return new CustomEvent(eventName, { detail: eventArgs });
    }
}
export default AblesEventFactory;
