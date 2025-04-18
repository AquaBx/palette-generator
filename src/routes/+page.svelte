<script lang="ts">
  import { Matrix, PolygoneMatrix } from "$lib/Matrix";
  import { HexaColor } from "$lib/Color";
  import Input from "../components/Input.svelte";
  import DemoLayout from "../components/DemoLayout.svelte";

  let range = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  let rangeM = new PolygoneMatrix(range, 2);

  let color = $state("#ff0000");
  let light = $state(false);
  let hue = $state(0);
  let lumin = $state(5);
  let lumax = $state(95);
  let satLight = $state(65);
  let satDark = $state(95);
  let hueRotate = $state(180);
  let containerSatDec = $state(8);

  let hueCompl = $derived((hue + hueRotate) % 360);
  let saturation = $derived(light ? satLight : satDark);

  let colorInstance = $derived(new HexaColor(color));
  let hsl = $derived(colorInstance.hsl);

  let A = $derived(
    new PolygoneMatrix(light ? [50, 500, 950] : [950, 500, 50], 2)
  );
  let Ap = $derived(A.inverse());
  let B = $derived(Ap.multiply(new Matrix([[lumin], [hsl[2]], [lumax]])));
  let C = $derived(rangeM.multiply(B));

  let code = $state("");

  $effect(() => {
    let codetemp = "@theme {\n";

    for (let j in range) {
      let i = parseInt(j);

      let prop1 = `--color-${range[i]}`;
      let val1 = `hsl(${hueCompl},${(saturation / containerSatDec).toFixed(3)}%,${C.get(i, 0).toFixed(3)}%)`;

      let prop2 = `--compl-${range[i]}`;
      let val2 = `hsl(${hue},${saturation}%,${C.get(i, 0).toFixed(3)}%)`;

      document.querySelector(":root")!.style!.setProperty(prop1, val1);
      document.querySelector(":root")!.style!.setProperty(prop2, val2);

      codetemp += `     --color-${prop1.slice(2)}:${val1};\n`;
      codetemp += `     --color-${prop2.slice(2)}:${val2};\n`;
    }
    codetemp += "}";
    code = codetemp;
  });
</script>

<div class="relative isolate bg-color-950 px-6 py-24 sm:py-32 lg:px-8">
  <div class="mx-auto max-w-4xl text-center">
    <h2 class="text-base/7 font-semibold text-compl-500">Pricing</h2>
    <p
      class="mt-2 text-balance text-5xl font-semibold tracking-tight text-color-200 sm:text-6xl"
    >
      Choose the right theme for you
    </p>
  </div>
  <p
    class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-color-400 sm:text-xl/8"
  >
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, alias!
    Commodi aliquid assumenda hic adipisci. Eaque ipsa, perferendis vitae
    aperiam doloremque amet? Voluptas, accusantium? Natus, enim? In tempora
    labore mollitia?
  </p>

  <label class="inline-flex items-center mb-5 cursor-pointer">
    <input type="checkbox" bind:checked={light} class="sr-only peer" />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
  </label>

  <label>
    Hue
    <Input type="number" min={0} max={360} bind:value={hue}></Input>
  </label>
  <label>
    Luminance Lighest color
    <Input type="number" min={0} max={100} bind:value={lumin}></Input>
  </label>
  <label>
    Luminance Darkest color
    <Input type="number" min={0} max={100} bind:value={lumax}></Input>
  </label>
  <label>
    Saturation Lightest color
    <Input type="number" min={0} max={100} bind:value={satLight}></Input>
  </label>
  <label>
    Saturation Darkest color
    <Input type="number" min={0} max={100} bind:value={satDark}></Input>
  </label>
  <label>
    Hue Rotate ( Complementary )
    <Input type="number" min={0} max={360} bind:value={hueRotate}></Input>
  </label>

  <div class="flex gap-2">
    {#each range as shade}
      <div class="w-32 aspect-square" style="background : var(--color-{shade})">
        {shade}
      </div>
    {/each}
  </div>
  <div class="flex gap-2">
    {#each range as shade}
      <div class="w-32 aspect-square" style="background : var(--compl-{shade})">
        {shade}
      </div>
    {/each}
  </div>

  <pre class="p-4 rounded-xl bg-color-900 text-color-100">{code}</pre>

  <DemoLayout></DemoLayout>
</div>
