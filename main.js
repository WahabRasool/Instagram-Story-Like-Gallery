class Story {  
    constructor(element) {
      this.current = 0;
      this.story = element;
      this.images = this.story.querySelectorAll('img');
      this.images[0].classList.add('active');
      this.story.addEventListener('click', this.handleClick.bind(this));
      this.bubbles = [];
      
      this.initBubbles();
      this.bubbles[0].classList.add('story__bubble--active');
    }
    
    initBubbles() {
      let bubbleBox = document.createElement('div');
      bubbleBox.classList.add('story__bubbles');
      bubbleBox.style.setProperty('--count', this.images.length);
      
      this.images.forEach((img) => {
        let imgBubble = document.createElement('div');
        imgBubble.classList.add('story__bubble');
        bubbleBox.append(imgBubble);
        this.bubbles.push(imgBubble);
      });
      
      this.story.prepend(bubbleBox);
    }
    
    handleClick(e) {
      let { x } = e;
      let box = this.story.getBoundingClientRect();
      let percent = 100 / box.width * (x - box.left);
      if (percent > 50) {
        this.current++;
        if (this.current >= this.images.length)
          this.current = 0;
      } else {
        this.current--;
        if (this.current < 0)
          this.current = this.images.length - 1;
      }
      
      this.images.forEach((img, i) => {
        if (i == this.current) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
      this.bubbles.forEach((bubble, i) => {
        if (i == this.current) {
          bubble.classList.add('story__bubble--active');
        } else {
          bubble.classList.remove('story__bubble--active');
        }
      });
    }
  }
  
  console.clear();
  new Story(document.querySelector('.story'));