function doing(name: string): string{
    return name;
}
// doing(123);
doing("loader.ts derick");

const p = new Promise((resolve)=>{
    resolve("loader.ts promise");
});
console.log(p);