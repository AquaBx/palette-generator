class u8 {
    private v;
    constructor(v:number) {
        this.v = Math.min(255,Math.max(0,v));
    }
    public get get_value() : number {
        return this.v;
    }
    public set set_value(v:number) {
        this.v = Math.min(255,Math.max(0,v))
    }

    public toString(radix?: number): string {
        return this.v.toString(radix);
    }
}

export class Color {
    private r : u8;
    private g : u8;
    private b : u8;

    constructor(r :number,g :number,b :number) {
        this.r = new u8(r);
        this.g = new u8(g);
        this.b = new u8(b);
    }

    public get rgb() : [number,number,number] {
        return [this.r.get_value,this.g.get_value,this.b.get_value];
    }

    public get hexadecimal() : [string,string,string]{
        let r = this.r.toString(16).padStart(2, "0");
        let g = this.g.toString(16).padStart(2, "0");
        let b = this.b.toString(16).padStart(2, "0");
        return [r,g,b];
    }

    public get hsl() : [number,number,number]{
        let r = this.r.get_value / 255;
        let g = this.g.get_value / 255;
        let b = this.b.get_value / 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return [h, s, l];
    }

    toString(radix?: number): string {
        switch (radix) {
            case 1:
                return `rgb(${this.rgb.join(",")})`;
            case 2:
                let hsl = this.hsl
                return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
            default:
                return "#"+this.hexadecimal.join("");
        }
    }
}

export class HexaColor extends Color {
    constructor(code:string) {
        let r = Number("0x" + code.slice(1,3) );
        let g = Number("0x" + code.slice(3,5) );
        let b = Number("0x" + code.slice(5,7) );
        super(r,g,b);
    }
}