window.addClickEventListener = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.addEventListener('click', function(event) {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            DotNet.invokeMethodAsync('YourBlazorAppNamespace', 'OnPlotClick', x, y);
        });
    }
};
