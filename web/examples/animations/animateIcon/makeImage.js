// addImage를 사용해 지도에 추가할 애니메이션 도트 객체입니다
export class pulsingDot {
    constructor(options) {
        this.size = options.size;
        this.width = options.size; //도트 너비
        this.height = options.size; //도트 높이
        this.data = new Uint8Array(options.size * options.size * 4);
        this.context = undefined;
        this.map = options.map; //추가할 맵
    }

    // addImage 함수를 통해 지도에 layer가 추가될 때 호출되는 메소드
    onAdd() {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
    }

    // 각 프레임마다 icon을 새로 갱신하는 메소드
    render() {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        // inner와 outer icon의 반지름 크기를 다르게 지정
        const radius = (this.size / 2) * 0.3;
        const outerRadius = (this.size / 2) * 0.7 * t + radius;
        const context = this.context;

        // outer icon 그리기
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
        context.fill();

        // inner icon 그리기
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // canvas의 데이터 갱신
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // 연속적으로 지도 다시 그림(부드러운 점 애니메이션으로 표출)
        this.map.triggerRepaint();

        // 지도에 image 갱신을 알리기 위한 true 값 리턴
        return true;
    }
}