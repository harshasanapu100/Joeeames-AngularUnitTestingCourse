import { StrengthPipe } from "./strength.pipe";

describe('Strength Pipe', () => {
    it('should display weak if strength is 5',()=>{
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const result = pipe.transform(5);

        // Assert
        expect(result).toEqual('5 (weak)');
    });

    it('should display strong if strength greater than 10 or lesser than 20',()=>{
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const result = pipe.transform(15);

        // Assert
        expect(result).toEqual('15 (strong)');
    });

    it('should display unbelievable if strength is greater than 20',()=>{
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const result = pipe.transform(25);

        // Assert
        expect(result).toEqual('25 (unbelievable)');
    });
});