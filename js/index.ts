import { Universe, Cell, wasm_memory } from "wasm-game-of-life";

const CELL_SIZE_PX = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

export class GameOfLife {
  universe!: Universe;
  memory!: WebAssembly.Memory;
  // animationId = null as any;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  public initialize(): void {
    this.universe = Universe.new();
    this.memory = wasm_memory();

    this.createCanvas();

    this.drawGrid();
    this.drawCells();
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  private createCanvas = () => {
    // Give the canvas room for all of our cells and a 1px border
    // around each of them.
    const canvas = document.getElementById("gol-canvas") as HTMLCanvasElement;
    canvas.height = (CELL_SIZE_PX + 1) * this.height + 1;
    canvas.width = (CELL_SIZE_PX + 1) * this.width + 1;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  };

  private get width() {
    return this.universe.width();
  }

  private get height() {
    return this.universe.height();
  }

  private drawGrid(): void {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines
    for (let i = 0; i <= this.width; i++) {
      ctx.moveTo(i * (CELL_SIZE_PX + 1) + 1, 0);
      ctx.lineTo(
        i * (CELL_SIZE_PX + 1) + 1,
        (CELL_SIZE_PX + 1) * this.height + 1
      );
    }

    // Horizontal lines
    for (let j = 0; j <= this.height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE_PX + 1) + 1);
      ctx.lineTo(
        (CELL_SIZE_PX + 1) * this.width + 1,
        j * (CELL_SIZE_PX + 1) + 1
      );
    }

    ctx.stroke();
  }

  private getIndex(row: number, col: number): number {
    return row * this.width + col;
  }

  private drawCells(): void {
    const cellsPtr = this.universe.cells();
    const cells = new Uint8Array(
      wasm_memory().buffer,
      cellsPtr,
      this.width * this.height
    );

    // console.log({cells});

    const ctx = this.ctx;
    ctx.beginPath();

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const idx = this.getIndex(row, col);

        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

        ctx.fillRect(
          col * (CELL_SIZE_PX + 1) + 1,
          row * (CELL_SIZE_PX + 1) + 1,
          CELL_SIZE_PX,
          CELL_SIZE_PX
        );
      }
    }

    ctx.stroke();
  }

  private renderLoop(): void {
    this.universe.tick();

    this.drawGrid();
    this.drawCells();

    requestAnimationFrame(this.renderLoop.bind(this));
  }
}

const gol = new GameOfLife();
gol.initialize();
