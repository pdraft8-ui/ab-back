describe("Simple Test", () => {
  it("should pass", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle strings", () => {
    expect("hello").toBe("hello");
  });

  it("should handle objects", () => {
    const obj = { name: "test" };
    expect(obj.name).toBe("test");
  });
});
