"use strict";

export function initRunningLine(containerId, speed = 1) {
    const runningLineContainer = document.getElementById(containerId);

    if (!runningLineContainer) {
        return;
    }

    const runningLineList = runningLineContainer.querySelector('.running-line__list');

    if (!runningLineList) {
        return;
    }

    const runningLineListClone = runningLineList.cloneNode(true);
    runningLineContainer.appendChild(runningLineListClone);

    let totalWidth = runningLineList.scrollWidth;
    let currentX = 0;

    function updateDimensions() {
        totalWidth = runningLineList.scrollWidth;
        runningLineContainer.style.width = `${totalWidth * 2}px`;

        // Устанавливаем начальное положение для обоих списков
        runningLineList.style.transform = `translateX(${currentX}px)`;
        runningLineListClone.style.transform = `translateX(${currentX + totalWidth}px)`;
    }

    function animate() {
        currentX -= speed;

        if (Math.abs(currentX) >= totalWidth) {
            currentX = 0;
            runningLineList.style.transform = `translateX(${totalWidth}px)`;
            runningLineListClone.style.transform = `translateX(${totalWidth}px)`;
        }

        runningLineList.style.transform = `translateX(${currentX}px)`;
        runningLineListClone.style.transform = `translateX(${currentX + totalWidth}px)`;

        requestAnimationFrame(animate);
    }

    function handleResize() {
        updateDimensions();
    }

    updateDimensions();
    animate();

    window.addEventListener('resize', handleResize);
}
