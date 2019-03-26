import {getRegisterState, getChatState} from '..'

// Tests for selectors
describe(">>>Chat App Selectors", () => {
    it("+++Register State Selector", () => {      
        const initialState = { 
            "chat" : {
                "loading": false, 
                "err": null,
                "username": null,
                "chatHistory": []
            }
        };
        
        const selectedState = {
            "loading": false, 
            "err": null,
            "username": null
        }

        expect(getRegisterState(initialState)).not.toBeNull();
        expect(getRegisterState(initialState)).toHaveProperty('loading');
        expect(getRegisterState(initialState)).toHaveProperty('err');
        expect(getRegisterState(initialState)).toHaveProperty('username');
    });
    
    it("+++Chat State Selector", () => {
        const initialState = { 
            "chat" : {
                "loading": false, 
                "err": null,
                "username": null,
                "chatHistory": []
            }
        };
        
        const selectedState = {
            "loading": false, 
            "err": null,
            "username": null,
            "chatHistory": []
        };

        expect(getChatState(initialState)).not.toBeNull();
        expect(getChatState(initialState)).toHaveProperty('loading');
        expect(getChatState(initialState)).toHaveProperty('err');
        expect(getChatState(initialState)).toHaveProperty('username');
        expect(getChatState(initialState)).toHaveProperty('history');
    })
});