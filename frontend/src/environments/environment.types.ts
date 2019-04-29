export interface Ienvironment {
    production: boolean;
}

export interface IappSettings {
    TITLE: string;
    matomo: boolean;
    defaultTheme: string;
}

export interface IapiSettings {
    main: string;
    test: string;
}

export interface IlocalStorageSettings {
    theme: string;
}

export interface IthemeDesigns {
    [theme: string]: {
        name: string;
        tag: string;
    };
}
