import create from 'zustand';

export const userState = create((set) => ({
    sesion: {
        isValid: false
    },
    addSesion: (key) => 
        set((state) => ({
            sesion: {...state.sesion, isValid: key.isValid}
        })),
    removeSesion: () =>
        set((state) => ({
            sesion: {...state.sesion, isValid: false}
        }))
}));
