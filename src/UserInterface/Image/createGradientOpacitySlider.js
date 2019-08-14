import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import gradientOpacityIcon from '../icons/gradient.svg';

function createGradientOpacitySlider(
  uiContainer,
  viewerDOMId,
  viewerStore,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      id="${viewerDOMId}-gradientOpacitySlider"
      class="${style.slider}" />`;
  const edgeElement = sliderEntry.querySelector(
    `#${viewerDOMId}-gradientOpacitySlider`
  );
  function updateGradientOpacity() {
    const value = Number(edgeElement.value);
    volumeRepresentation.setEdgeGradient(value);
    renderWindow.render();
  }
  edgeElement.addEventListener('input', updateGradientOpacity);
  updateGradientOpacity();
  uiContainer.appendChild(sliderEntry);

  return updateGradientOpacity;
}

export default createGradientOpacitySlider;
