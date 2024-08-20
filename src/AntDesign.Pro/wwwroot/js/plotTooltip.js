window.initializePlotTooltip = (plotId, dotNetHelper) => {
    const plotElement = document.getElementById(plotId);
    const tooltip = document.getElementById('tooltip');
    const tooltipContent = document.getElementById('tooltip-content');

    plotElement.addEventListener('mousemove', async (e) => {
        const rect = plotElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dataCoordinates = plotElement.splot.GetPixel(mouseX, mouseY);
        const tooltipText = await dotNetHelper.invokeMethodAsync('GetNearestPoint', dataCoordinates.x, dataCoordinates.y);

        tooltipContent.innerText = tooltipText;
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.display = 'block';
    });

    plotElement.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
};
