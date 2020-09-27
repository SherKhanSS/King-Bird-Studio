import React from "react";

class Image extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
    };

    this.imageRef = React.createRef();
    this.containerRef = React.createRef(); 

    this.handleMagnification = this.handleMagnification.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  componentDidMount() {
    const {photos, indexFullscreenPhoto} = this.props;  
    const image = this.imageRef.current;
    const container = this.containerRef.current;

    image.src = photos[indexFullscreenPhoto].img_src;

    try {
      container.requestFullscreen();   
    } catch (err) {  
      alert(`Automatic full screen mode is not supported`);   
    }
    
  } 

  componentDidUpdate() {
    const {photos, indexFullscreenPhoto} = this.props;  
    const image = this.imageRef.current;

    image.src = photos[indexFullscreenPhoto].img_src;
  }

  componentWillUnmount() {
    const image = this.imageRef.current;  
    image.src = null;
  }
  
  handleMagnification() {
    const {scale} = this.state;    
    const CURRENT_SCALE = 0.1;
    const MAX_SCALE = 2;

    if (scale < MAX_SCALE) {
      this.setState({
        scale: scale + CURRENT_SCALE,
      });
    }
  }
  
  handleDecrease() {
    const {scale} = this.state;
    const CURRENT_SCALE = 0.1;
    const MIN_SCALE = 0.5;

    if (scale > MIN_SCALE) {
      this.setState({
        scale: scale - CURRENT_SCALE,
      });
    }
  }

  render() {
    const {scale} = this.state;
    const {indexFullscreenPhoto, onCloseButtonClick, onPrevNextButtonClick} = this.props;

    return (
      <section 
        className="fullscreen"
        ref={this.containerRef}>
        <img 
          ref={this.imageRef}
          className="fullscreen__image" 
          alt={`from the rover`}
          style={{transform: `scale(${scale})`}}
          onWheel={(evt) => {
            if (evt.deltaY > 0) {
              this.handleMagnification();
            } else if (evt.deltaY < 0)
              this.handleDecrease();
          }}
        />
        <button
          className="fullscreen__close"
          onClick={() =>{
            onCloseButtonClick(false);
          }}
          type="button">         
          <svg width="24" height="24" viewBox="0 0 24 24">
            <defs>
              <path id="a" d="M13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 11-1.414-1.414L10.586 12 5.293 6.707a1 1 0 011.414-1.414L12 10.586l5.293-5.293a1 1 0 011.414 1.414L13.414 12z"></path>
            </defs>
            <use fill="#fff" fillRule="evenodd" xlinkHref="#a"></use>
          </svg>
          <span className="visually-hidden">Close photo</span>
        </button>
        <div className="fullscreen__arrow-wrap">
          <button
            className="fullscreen__arrow-left"
            onClick={() =>{
              if(indexFullscreenPhoto > 0) {
                onPrevNextButtonClick(indexFullscreenPhoto - 1);
              }             
            }}
            style={{opacity: `${indexFullscreenPhoto === 0 ? 0.3 : 1}`}}
            type="button">         
            <svg width={24} height={24} viewBox="0 0 24 24">
              <defs>
                <path id="prefix__a" d="M6.414 13l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L6.414 11H20a1 1 0 010 2H6.414z"/>
              </defs>
              <use fill="#fff" fillRule="evenodd" xlinkHref="#prefix__a" />
            </svg>
            <span className="visually-hidden">Arrow left</span>
          </button>
          <button
            className="fullscreen__arrow-right"
            onClick={() =>{
              if(indexFullscreenPhoto < 24) {
                onPrevNextButtonClick(indexFullscreenPhoto + 1);
              }             
            }}
            style={{opacity: `${indexFullscreenPhoto === 24 ? 0.3 : 1}`}}
            type="button">         
            <svg width={24} height={24} viewBox="0 0 24 24">
              <use fill="#fff" fillRule="evenodd" xlinkHref="#prefix__a"></use>
            </svg>
            <span className="visually-hidden">Arrow right</span>
          </button>
        </div>
      </section>
    );
  }
}

export default Image;
