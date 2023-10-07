class ApplicationStateModel {
    private static instance: ApplicationStateModel;

    private isAppLive: boolean;
    private isAppReady: boolean;

    private constructor() {
        this.isAppLive = false;
        this.isAppReady = false;
    }

    public static getInstance(): ApplicationStateModel {
        if (!ApplicationStateModel.instance) ApplicationStateModel.instance = new ApplicationStateModel();

        return ApplicationStateModel.instance;
    }

    public reset() {
        this.isAppLive = false;
        this.isAppReady = false;
    }

    // Getters - Setters
    public getIsAppLive(): boolean {
        return this.isAppLive;
    }

    public getIsAppReady(): boolean {
        return this.isAppReady;
    }

    public setIsAppLive(value: boolean): void {
        this.isAppLive = value;
    }

    public setIsAppReady(value: boolean): void {
        this.isAppReady = value;
    }
}

export default ApplicationStateModel.getInstance();
