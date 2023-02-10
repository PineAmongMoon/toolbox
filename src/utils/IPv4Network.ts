export class IPv4Network {
  private addressValue = 0;
  private markValue = 0;

  public copy() {
    const returnValue = new IPv4Network();
    returnValue.addressValue = this.addressValue;
    returnValue.markValue = this.markValue;
    return returnValue;
  }

  private static aton(value: string): number {
    let arr = value.split('.').map((v) => parseInt(v));

    if (arr.length !== 4) {
      return -1;
    }

    if (arr.some((v) => !Number.isInteger(v) || v < 0 || v > 255)) {
      return -1;
    }

    return arr[0] * 0x100_0000 + arr[1] * 0x1_0000 + arr[2] * 0x100 + arr[3];
  }

  private static ntoa(value: number): string {
    if (value < 0 || value > 0xffff_ffff) {
      return '';
    }
    return `${(value >>> 24) & 0xff}.${(value >>> 16) & 0xff}.${
      (value >>> 8) & 0xff
    }.${value & 0xff}`;
  }

  private static markIsSafe(maybeVale: number) {
    return (
      Number.isInteger(maybeVale) &&
      maybeVale >= 0 &&
      maybeVale <= 0xffff_ffff &&
      Array.from({ length: 33 }, (_, i) => i).some(
        (i) => maybeVale + Math.pow(2, i) === 0x1_0000_0000,
      )
    );
  }

  public get address(): string {
    return IPv4Network.ntoa(this.addressValue);
  }

  public set address(rVal: string) {
    this.addressValue = IPv4Network.aton(rVal);
  }

  public get mark(): string {
    return IPv4Network.ntoa(this.markValue);
  }

  public set mark(rVal: string) {
    const maybeValue = IPv4Network.aton(rVal);
    if (IPv4Network.markIsSafe(maybeValue)) {
      this.markValue = maybeValue;
    }
  }

  public get markLength(): number {
    return 32 - Math.log2(this.networkSize);
  }

  public set markLength(rVal: number) {
    if (rVal >= 0 && rVal <= 32) {
      this.markValue = 0x1_0000_0000 - Math.pow(2, 32 - rVal);
    }
  }

  public get networkSize(): number {
    return 0x1_0000_0000 - this.markValue;
  }

  private get networkValue(): number {
    return this.addressValue - (this.addressValue % this.networkSize);
  }

  public get networkAddress(): string {
    return IPv4Network.ntoa(this.networkValue);
  }

  private get boradcasValue(): number {
    return this.networkValue + this.networkSize - 1;
  }

  public get boradcastAddress(): string {
    return IPv4Network.ntoa(this.boradcasValue);
  }

  public get firstHostAddress(): string {
    return this.networkSize >= 4 ? IPv4Network.ntoa(this.networkValue + 1) : '';
  }

  public get lastHostAddress(): string {
    return this.networkSize >= 4
      ? IPv4Network.ntoa(this.boradcasValue - 1)
      : '';
  }
}
