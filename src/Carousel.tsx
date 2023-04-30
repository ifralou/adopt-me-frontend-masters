import React, {Component, MouseEvent} from 'react';

interface Props {
   images: string[]
}

class Carousel extends Component<Props> {
    state = {
        active: 0
    }

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    handleIndexClick = (event: MouseEvent<HTMLElement>) => {
        if(!(event.target instanceof HTMLElement)) {
            return;
        }

        this.setState({
            //Everything from DOM is a string.
            active: Number(event.target.dataset.index)
        });
    }

    render() {
        const {active} = this.state;
        const {images} = this.props;

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal hero"/>
                <div className="carousel-smaller">
                    {
                        images.map((photo, index) =>
                            <img key={photo}
                                 onClick={this.handleIndexClick}
                                 data-index={index}
                                 src={photo}
                                 className={index === active ? "active" : ""}
                                 alt="animal thumbnail"
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Carousel;