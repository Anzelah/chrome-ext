// THIS SERVICE WORKER BLOCKS AD REQUESTS AND REDIRECTS THEM. Service workers are proxies between browser and web servers.

chrome.runtime.onInstalled.addListener(() => {
    const defaultFilters = [
        "*://*.googlesyndication.com/*",
        "*://*adservice.google.com/*",
        "*://*.quantserve.com/*",
        "*://*.scorecardresearch.com/*",
        "*://*.zedo.com/*",
        "*://*.doubleclick.net/*",
        "*://partner.googleadservices.com/*",
        "*://creative.ak.fbcdn.net/*",
        "*://*.adbrite.com/*",
        "*://*.exponential.com/*"
        ]

    //create rules for each filter. urlFilter cannot take an array (defaultFilters). 
    //Each rule handles one filter string at a time, meaning you'll need multiple rules for different URLs.
    const rules = defaultFilters.map( (item, index) => ({
        id: index + 1,
        priority: 1,
        action: {
            type: 'block'
        },
        condition: {
            urlFilter: item,
            resourceTypes: ['image', 'media', 'xmlhttprequest']
        }
    })); 
        
    
    chrome.declarativeNetRequest.updateDynamicRules(
        {
            addRules: rules,
            removeRuleIds: rules.map(item => item.id)

        },
        () => {
            if (chrome.runtime.lastError) {
                console.log('Error setting up rules')
                console.error(chrome.runtime.lastError)
            } else {
                console.log("Ad blocking rules set succesfully", JSON.stringify(rules[1]))
            }
        }
    );
});